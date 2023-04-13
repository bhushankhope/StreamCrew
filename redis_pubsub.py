import redis
import json
client = redis.Redis(host='129.79.197.64', port=6379)

def publishData(channelName, content):
    contentJson = json.dumps(content)
    client.publish(channelName, contentJson)
    
def handleData(content):
    contentJson = content.decode('utf-8')
    dataDict = json.loads(contentJson)
    print(dataDict)
    
def subscribeData(channelName):
    pubsubObj = client.pubsub()
    pubsubObj.subscribe(channelName)
    while True:
        for data in pubsubObj.listen():
            if data and data['type']=='message':
                handleData(data['data'])
                client.rpush(channelName, data['data'])