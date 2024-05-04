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
    offer_owner_username = serializers.SerializerMethodField()
    cat_offer = serializers.PrimaryKeyRelatedField(queryset=CatOffer.objects.all())

    class Meta:
        model = ChatMessage
        fields = ['id', 'offer_owner_username', 'user', 'cat_offer', 'cat_offer_name', 'cat_offer_picture', 'sender', 'sender_profile', 'sender_profile_name', 'receiver', 'receiver_profile', 'receiver_profile_name', 'message', 'is_read','date']

    def get_sender_profile_name(self, obj):
        return obj.sender_profile.user.username if obj.sender_profile else None

    def get_receiver_profile_name(self, obj):
        return obj.receiver_profile.user.username if obj.receiver_profile else None

    def get_cat_offer_name(self, obj):
        if isinstance(obj, dict):
            return None
        return obj.cat_offer.name if obj.cat_offer else None

    def get_cat_offer_picture(self, obj):
        return obj.cat_offer.picture.url if obj.cat_offer and obj.cat_offer.picture else None

    def get_offer_owner_username(self, obj):
        return obj.cat_offer.user.username if obj.cat_offer and obj.cat_offer.user else None
