import asyncio
import logging
from datetime import datetime
import os
import pathlib
import sys 
from dotenv import load_dotenv
from fastapi import APIRouter
from fastapi import WebSocket, WebSocketDisconnect
import asyncio
from typing import Optional

import aiormq
from aiormq.abc import DeliveredMessage


sys.path.append("/home/${USER}/db_connector")
from dbConnector import db_conn

load_dotenv()

router = APIRouter()


socketConnections = []

async def on_message(message):
    print("received message on consume:", message)
    for x in socketConnections:
        await x.send_json(
            {
                "message":  message.body.decode('utf-8'),
                "time": datetime.now().strftime("%H:%M:%S"),
            }
        )

def process_play(data):
    print("Received data:", data)
    return data

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    # Accept the connection from a client.
    await websocket.accept()
    global socketConnections
    socketConnections.append(websocket)

    while True:
        try:
            # Receive the JSON data sent by a client.
            data = await websocket.receive_json()
            connection = await aiormq.connect("amqp://guest:guest@rabbitmq/")
            channel = await connection.channel()
            declare_ok = await channel.queue_declare('channel')
            # Some (fake) heavy data processing logic.
            await channel.basic_publish(data.encode('utf-8'), routing_key='channel')
            message_processed = process_play(data)
            consume_ok = await channel.basic_consume(declare_ok.queue, on_message, no_ack=False)
            print(websocket)
            
        except WebSocketDisconnect:
            print("client connection disconnected")
            socketConnections = []
