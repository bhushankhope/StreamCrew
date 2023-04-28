import asyncio
import logging
from datetime import datetime


from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from getContent import getContent_router
from getContent import startStream_router
from getContent import websocket_router
from getContent import websocket_async_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(getContent_router.router)
app.include_router(startStream_router.router)
# app.include_router(websocket_router.router)
app.include_router(websocket_async_router.router)