
import redis

class RedisConn:
    def __init__(self):
        self.conn = redis.Redis(host='redis', port=6379, db=0)

def getCacheData(key):
    cache = RedisConn()
    if cache.conn.exists(key):
        print("Getting data from cache")
    return cache.conn.get(key)
    
def updateCache(key, value, filePath, cid, s3_client):
    cache = RedisConn()
    res = cache.conn.set(key, value)
    if res == True:
        s3_client.upload_file(Filename= filePath, Bucket="streamcrew-movie-cache", Key= cid)
        print("Updated Cache")
    else:
        print("Failed to update cache")