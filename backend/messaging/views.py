from django.shortcuts import render
from django.contrib.auth.models import User
from messaging.serializers import MessageSerializer
from messaging.models import ChatMessage
from offers.models import CatOffer
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Subquery, OuterRef, Q
from users.serializers import ProfileSerializer
from users.models import Profile

class Inbox(generics.ListAPIView):
    serializer_class = MessageSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']

        unique_offers = ChatMessage.objects.filter(
            Q(sender=user_id) |
            Q(receiver=user_id)
        ).order_by('-cat_offer').values_list('cat_offer', flat=True).distinct()

        print("offres uniques:", unique_offers)
        conversations = []
        added_conversations = set()

        for cat_offer in unique_offers:
            offer_info = CatOffer.objects.get(id=cat_offer)
            print("offer INFO: ", offer_info)
            messages = ChatMessage.objects.filter(
                (Q(receiver=user_id) | Q(sender=user_id))  &
                Q(cat_offer=offer_info)
            ).order_by('-date')

            print('ya quoi là:', messages)

            for message in messages:
                other_user_id = message.sender_id if message.receiver_id == user_id else message.receiver_id
                conversation_key = (offer_info.id, user_id, other_user_id)
                if conversation_key not in added_conversations:
                    conversations.append(message)


        print('jeretourne::', conversations)
        return conversations

class GetMessages(generics.ListAPIView):
    serializer_class = MessageSerializer

    def get_queryset(self):
        sender_id = self.kwargs['sender_id']
        receiver_id = self.kwargs['receiver_id']
        cat_offer = self.kwargs['cat_offer']
        # username = self.kwargs['username']

        messages = ChatMessage.objects.filter(
            (Q(sender=sender_id) & Q(receiver=receiver_id)) |
            (Q(sender=receiver_id) & Q(receiver=sender_id)),
            cat_offer=cat_offer
        ).order_by('date')
        return messages

class SendMessage(generics.CreateAPIView):
    serializer_class = MessageSerializer

    def perform_create(self, serializer):
        cat_offer = self.request.data.get('cat_offer')

        if not cat_offer:
            return Response({"error": "No cat_offer provided"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            offer = CatOffer.objects.get(id=cat_offer)
        except CatOffer.DoesNotExist:
            return Response({"error": "Invalid cat_offer"}, status=status.HTTP_404_NOT_FOUND)

        # associate each msg to a specific offer
        serializer.save(offer=offer)



class SearchUserEmail(generics.ListAPIView):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
    # permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        username = self.kwargs['username']
        logged_in_user = self.request.user
        users = Profile.objects.filter(
            Q(user__username__icontains=username),

        )

        if not users.exists():
            return Response(
                {'detail': 'No user found'},
                status=status.HTTP_404_NOT_FOUND
                )

        serializer = self.get_serializer(users, many=True)
        return Response(serializer.data)
