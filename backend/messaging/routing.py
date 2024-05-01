from channels.routing import ProtocolTypeRouter, URLRouter
# import app.routing
from django.urls import re_path, path
from .consumers import ChatConsumer

websocket_urlpatterns = [
    path('ws/messaging/', ChatConsumer.as_asgi()),
]

print(websocket_urlpatterns)

# the websocket will open at 127.0.0.1:8000/ws/<room_name>
application = ProtocolTypeRouter({
    'websocket':
        URLRouter(
            websocket_urlpatterns
        )
    ,
})
