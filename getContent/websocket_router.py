import asyncio
import logging
from datetime import datetime
import os
import pathlib
import sys 
from dotenv import load_dotenv
from fastapi import APIRouter, Response, Request
from fastapi import FastAPI, WebSocket, WebSocketDisconnect


sys.path.append("/home/${USER}/db_connector")
from dbConnector import db_conn

load_dotenv()

router = APIRouter()


socketConnections = []

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
            # Some (fake) heavy data processing logic.
            message_processed = process_play(data)
            # Send JSON data to the client.
            print(websocket)
            for x in socketConnections:
                await x.send_json(
                    {
                        "message": message_processed,
                        "time": datetime.now().strftime("%H:%M:%S"),
                    }
                )
        except WebSocketDisconnect:
            print("client connection disconnected")
            socketConnections = []