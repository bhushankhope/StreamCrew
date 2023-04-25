from fastapi import APIRouter, Response, Request
from fastapi.responses import FileResponse
import boto3
from botocore.exceptions import ClientError
from dotenv import load_dotenv
import os
import pathlib
import sys


sys.path.append("/home/${USER}/cache")
from cache import cache

load_dotenv()

router = APIRouter(
    prefix='/getContent',
    tags = ['get data']
)

awsSession = boto3.Session(
    aws_access_key_id= os.getenv('AWS_SERVER_PUBLIC_KEY'),
    aws_secret_access_key= os.getenv('AWS_SERVER_SECRET_KEY') )
s3_resource = awsSession.resource('s3')
s3_client = awsSession.client('s3')

@router.get('/{cid}')
async def  get_content(cid: str):
    # The_Hustler(1961)---H264.mpd
    try:
        if cache.getCacheData(cid):
            path = os.path.dirname(os.path.realpath(__file__))+ "\\cache\\" + cid
            s3_client.download_file("streamcrew-movie-cache", cid, path)
        else:
            path = os.path.dirname(os.path.realpath(__file__))+ "\\" + cid

            s3_client.download_file("streamcrew-movie-output", cid, path)
            _ = cache.updateCache(cid, "streamcrew-cache", path, cid, s3_client)

        return FileResponse(path)


    except ClientError as e:
        error_code = e.response['Error']['Code']
        error_message = e.response['Error']['Message']
        print("Error code: {}. Error message: {}".format(error_code, error_message))
