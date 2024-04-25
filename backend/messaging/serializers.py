from messaging.models import ChatMessage
from offers.models import CatOffer
from users.models import Profile
from users.serializers import ProfileSerializer
from rest_framework import serializers
import base64

class MessageSerializer(serializers.ModelSerializer):
    receiver_profile = ProfileSerializer(read_only=True)
    sender_profile = ProfileSerializer(read_only=True)
    sender_profile_name = serializers.SerializerMethodField()
    receiver_profile_name = serializers.SerializerMethodField()
    cat_offer_name = serializers.SerializerMethodField()
    cat_offer_picture = serializers.SerializerMethodField()

    class Meta:
        model = ChatMessage
        fields = ['id', 'user', 'cat_offer', 'cat_offer_name', 'cat_offer_picture', 'sender', 'sender_profile', 'sender_profile_name', 'receiver', 'receiver_profile', 'receiver_profile_name', 'message', 'is_read','date']

    def get_sender_profile_name(self, obj):
        return obj.sender_profile.user.username if obj.sender_profile else None

    def get_receiver_profile_name(self, obj):
        return obj.receiver_profile.user.username if obj.receiver_profile else None

    def validate_cat_offer(self, value):
        if not value:
            raise serializers.ValidationError("No cat_offer provided")
        try:
            CatOffer.objects.get(id=value)
        except CatOffer.DoesNotExist:
            raise serializers.ValidationError("Invalid offer_id")
        return value

    def get_cat_offer_name(self, obj):
        return obj.cat_offer.name if obj.cat_offer else None

    def get_cat_offer_picture(self, obj):
        return obj.cat_offer.picture.url if obj.cat_offer and obj.cat_offer.picture else None
