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
from collections import defaultdict

class Inbox(generics.ListAPIView):
    serializer_class = MessageSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        conversations = []

        conversation_set = set()

        # Group messages by users pairs and by offer
        message_groups = defaultdict(dict)

        # Get all user's messages
        user_messages = ChatMessage.objects.filter(Q(sender=user_id) | Q(receiver=user_id)).order_by('-date')
        print("Tous les msg d'un utilisateur:", user_messages)

        # browse all messages of the user
        for message in user_messages:
            # Identicate all users of the conversation
            if message.sender_id == message.cat_offer.user.id:
                client_id = message.receiver_id
            else:
                client_id = message.sender_id
            conversation_key = f"{client_id} - {message.cat_offer.id}"
            print('KEY', conversation_key)


            #Add the message to the group conversation
            message_groups[conversation_key][message.cat_offer.id] = message

        # browse the messages groups to obtain the last message of each conversation
        for conversation_key, offer_messages in message_groups.items():
            # Check if the conversation key is unique
            if conversation_key not in conversation_set:
                conversations.append(offer_messages[max(offer_messages)])

                # Mark the conversation key as seen
                conversation_set.add(conversation_key)

        # print('jeretourne::', conversations)
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
