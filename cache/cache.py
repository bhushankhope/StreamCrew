
import redis
## give the host value as the redis service IP
r = redis.Redis(host='localhost', port=6379, db=0)
r.set('test', 'redis')
value = r.get('test')
print(value)