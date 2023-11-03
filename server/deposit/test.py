from pymongo import MongoClient
from bson import Int64

cluster = MongoClient("mongodb+srv://Lfyz123:9LQCV2alEsLxuzjm@cluster0.xohgmc4.mongodb.net/?retryWrites=true&w=majority")
collection = cluster["MinesApp"]["users"]
users = collection.find()

for user in users:
    collection.update_one({'id_vk': user['id_vk']}, {'$set': {
        'balance': Int64(float(user['balance'])),
        # 'all_coin_win': Int64(float(user['all_coin_win'])),
        # 'all_coin_lose': Int64(float(user['all_coin_lose']))
    }})