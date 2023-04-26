import mysql.connector
import string
import random

class Connection:
    def __init__(self):
        self.mydb = mysql.connector.connect(
        # host="localhost",
        host="mydb",
        user="user",
        password="root123@",
        database="StreamCrew"
        )
        self.mycursor = self.mydb.cursor()

def generateHash():
    x = ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(5))
    return x

def createSession(contentId):
    print("Before generating has")
    hashId = generateHash()
    print("Generated Hash:", hashId)
    conn = Connection()
    conn.mycursor.execute("SELECT SessionId FROM Session WHERE SessionId=%s",(hashId,))
    data = conn.mycursor.fetchall()
    if data:
        hashId = createSession()
    else:
        conn.mycursor.execute("INSERT INTO Session(SessionId, ContentId) VALUES (%s,%s)",(hashId,contentId))
        
    conn.mycursor.close()
    conn.mydb.commit()
    return hashId
        
def joinSession(userId, sesionId):
    conn = Connection()
    conn.mycursor.execute("SELECT * FROM Users WHERE UserId=%s",(userId,))
    data = conn.mycursor.fetchall()
    if data:
        conn.mycursor.close()
        return "User is already in a session",data["SessionId"]
    else:
        conn.mycursor.execute("INSERT INTO Users(UserId, SessionId) VALUES (%s,%s)",(userId,sesionId))
        conn.mycursor.close()
        conn.mydb.commit()

def getSessionUsers(sessionId: string):
    conn = Connection()
    conn.mycursor.execute("SELECT * FROM Users WHERE SessionId=%s", (sessionId,))
    data = conn.mycursor.fetchall()
    res = []
    for x in data:
        print(x)
        res.append(x[0])
    conn.mycursor.close()
    return res

def getAllSessionUsers():
    conn = Connection()
    conn.mycursor.execute("SELECT * FROM Users ")
    data = conn.mycursor.fetchall()
    conn.mycursor.close()
    return data

def deleteSession(sessionId):
    conn = Connection()
    conn.mycursor.execute("SELECT * FROM Session WHERE SessionId=%s",(sessionId,))
    data = conn.mycursor.fetchall()
    if data:
        conn.mycursor.execute("DELETE FROM Session WHERE SessionId=%s",(sessionId,))
        conn.mycursor.execute("DELETE FROM Users WHERE SessionId=%s",(sessionId,))
        conn.mycursor.close()
        conn.mydb.commit()
    else:
        conn.mycursor.close()
        return "SessionId not found"
    
def dropSession(userId, sessionId):
    conn = Connection()
    conn.mycursor.execute("DELETE FROM Users WHERE UserId=%s and SessionId=%s",(userId, sessionId))
    conn.mycursor.close()
    conn.mydb.commit()
    