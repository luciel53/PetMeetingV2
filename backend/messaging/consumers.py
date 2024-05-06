import json
from channels.generic.websocket import AsyncWebsocketConsumer
from django.conf import settings
from channels.db import database_sync_to_async
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from django.contrib.auth.models import AnonymousUser
import jwt
from users.models import User
from offers.models import CatOffer

class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = 'messaging'
        self.room_group_name = self.room_name
        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )
        self.accept()
        print("Websocket connection established")

    def disconnect(self, code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )
        print("Websocket connection disconnected")


    def receive(self, text_data):
        print("Received text data:", text_data)
        try:
            # Parse the JSON string into a dictionary
            json_text = json.loads(text_data)

            # Access the "message" key from the dictionary
            user = json_text.get("user")
            sender = json_text.get("sender")
            receiver = json_text.get("receiver")
            message = json_text.get("message")
            is_read = json_text.get("is_read")
            cat_offer = json_text.get("cat_offer")

            # # Debugging: Print the extracted values
            # print("Parsed JSON:")
            # print("Message:", message)
            # print("User ID:", userId)
            # print("Receiver ID:", receiver_id)
            # print("Cat Offer ID:", cat_offer_id)
            # print("Is Read:", false)

            # check if the message is None before processing further
            # if message:
            #     print("Received message", message)

            # Send message to room group
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    "type": "chat_message",
                    "user": user,
                    "sender": sender,
                    "receiver": receiver,
                    "message": message,
                    "is_read": is_read,
                    "cat_offer": cat_offer,
                }
            )
        except json.JSONDecodeError as e:
            print("Error decoding JSON:", e)

    def chat_message(self, event):
        data = {
            "user": event['user'],
            "sender": event['sender'],
            "receiver": event['receiver'],
            "message": event['message'],
            "is_read": event['is_read'],
            "cat_offer": event['cat_offer'],
        }

        # convert data in json format
        json_data = json.dumps(data)

        # Send message to WebSocket
        self.send(text_data=json_data)

        print("Sent message", json_data)
