from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import ChatMessage
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import json

@receiver(post_save, sender=ChatMessage)
def send_chat_message(sender, instance, created, **kwargs):
    if created:
        # send message to the group
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "messaging",
            {
                "type": "chat_message",
                "message": json.dumps({
                    "id": instance.id,
                    "sender": instance.sender.id,
                    "receiver": instance.receiver.id,
                    "message": instance.message,
                    "date": instance.date.isoformat(),
                    "cat_offer": instance.cat_offer.id if instance.cat_offer else None
                })
            }
        )
