from config import collection
from bson.json_util import dumps
import time
import json
import schedule

cursor = collection.find({})

def backup():
    with open('collection.json', 'w') as file:
        json.dump(json.loads(dumps(cursor)), file)


schedule.every(10).minutes.do(backup)


while True:
    schedule.run_pending()
    time.sleep(1)