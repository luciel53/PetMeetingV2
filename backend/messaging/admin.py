from django.contrib import admin
from messaging.models import ChatMessage

class ChatMessageAdmin(admin.ModelAdmin):
    list_editable = ['is_read']
    list_display = ['sender', 'receiver', 'message', 'cat_offer', 'date', 'is_read']

admin.site.register(ChatMessage, ChatMessageAdmin)

