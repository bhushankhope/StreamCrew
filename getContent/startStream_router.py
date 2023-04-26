from fastapi import APIRouter, Response, Request
from fastapi.responses import FileResponse, JSONResponse
import boto3
from botocore.exceptions import ClientError
from dotenv import load_dotenv
import os
import pathlib
import sys 

sys.path.append("/home/${USER}/db_connector")
from dbConnector import db_conn

load_dotenv()

router = APIRouter(
    prefix='/Stream',
    tags = ['handle session']
)

@router.post('/createSession/{movie}/{userId}')
async def startSession(movie: str, userId: str):
    try:
        session_token = db_conn.createSession(movie, userId)
        return JSONResponse(status_code=200, content={"message": "Successfully created the session.", "sessionToken": session_token })

    except Exception as err:
        print('Error while creating session', err)
        return JSONResponse(status_code=500, content={"message": "Failed while creating the response" })

@router.post('/joinSession/{sessionId}/{userId}')
async def joinSession(userId: str, sessionId: str):
    try:
        db_conn.joinSession(userId, sessionId)
        return JSONResponse(status_code=200, content={"message": "Successfully joined the session." })

    except Exception as err:
        print('Error while joining session', err)
        return JSONResponse(status_code=500, content={"message": "Failed to join the session" })


@router.delete('/{sessionId}/{userId}')
async def removeUser(userId: str, sessionId: str):
    try:
        db_conn.dropSession(userId, sessionId)
        return JSONResponse(status_code=200, content={"message": "Successfully exited the session." })

    except Exception as err:
        print('Error while joining session', err)
        return JSONResponse(status_code=500, content={"message": "Failed to exit the session" })
    
@router.delete('/{sessionId}')
async def deleteSession(sessionId: str):
    try:
        db_conn.deleteSession(sessionId)
        return JSONResponse(status_code=200, content={"message": "Successfully deleted the session." })

    except Exception as err:
        print('Error while joining session', err)
        return JSONResponse(status_code=500, content={"message": "Failed to delete the session" })