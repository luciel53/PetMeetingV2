from messaging.models import ChatMessage
from users.models import Profile
from users.serializers import ProfileSerializer
from rest_framework import serializers

class MessageSerializer(serializers.ModelSerializer):
    receiver_profile = ProfileSerializer(read_only=True)
    sender_profile = ProfileSerializer(read_only=True)
    sender_profile_name = serializers.SerializerMethodField()
    receiver_profile_name = serializers.SerializerMethodField()

    class Meta:
        model = ChatMessage
        fields = ['id', 'user', 'sender', 'sender_profile', 'sender_profile_name', 'receiver', 'receiver_profile', 'receiver_profile_name', 'message', 'is_read','date']

    def get_sender_profile_name(self, obj):
        return obj.sender_profile.user.username if obj.sender_profile else None

    def get_receiver_profile_name(self, obj):
        return obj.receiver_profile.user.username if obj.receiver_profile else None
