from vkbottle.user import User, Message
from config import TOKEN, BOT_BANDIT_ID, collection, SERVER_URL
import logging
from bson import Int64
import requests

logging.getLogger("vkbottle").setLevel(logging.INFO)

user = User(token=TOKEN)

@user.on.message()
async def deposit(message: Message):
  try:
    if message.peer_id == BOT_BANDIT_ID and "ты получил" in message.text and "баланс" in message.text:
      amount = int(message.text.split("$")[1].split(" ")[0].replace(".", ""))
      uid = message.text.split("[")[1].split("|")[0].split("d")[1]
      collection.update_one({"id_vk": int(uid)}, {"$inc": {"balance": Int64(amount)}})

      requests.get(f'{SERVER_URL}/api/updateBalance?id_vk={uid}')
  except e as Exception:
    print(e)

user.run_forever()