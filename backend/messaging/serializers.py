from messaging.models import ChatMessage
from users.models import Profile
from users.serializers import ProfileSerializer
from rest_framework import serializers

class MessageSerializer(serializers.ModelSerializer):
    receiver_profile = ProfileSerializer(read_only=True)
    sender_profile = ProfileSerializer(read_only=True)

    class Meta:
        model = ChatMessage
        fields = ['id', 'user', 'sender', 'sender_profile', 'receiver', 'receiver_profile', 'message', 'is_read','date']
