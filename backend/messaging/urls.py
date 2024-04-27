from django.urls import path
from . import views

urlpatterns = [
    # Chat messages
    path("messages/<user_id>/", views.Inbox.as_view(), name="chat-messages"),
    path("get-messages/<sender_id>/<receiver_id>/<offer_id>", views.GetMessages.as_view(), name="get-messages"),
    path("send-messages/", views.SendMessage.as_view(), name="send-messages"),
    path("search/<username>", views.SearchUserEmail.as_view(), name="search-user-inbox")
]
