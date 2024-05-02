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
        json_text = json.loads(text_data)
        message = json_text["message"]
        print("Received message", message)

        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                "type": "chat_message",
                "message": message
            }
        )

    def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        self.send(text_data=event['message'])

        print("Sent message", message)
