from django.contrib.auth.models import User
from rest_framework import serializers
from findafriend.models import Page, UserProfile, Chat, ChatRoom 

class UserSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = User
		fields = ('url', 'username', 'email', 'groups')


class PageSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Page
		fields = ('title', 'creator', 'sizeOfGroup', 'description', 'timeCreated', 'members')



class ProfileSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = UserProfile
		fields = ('user', 'first_name', 'last_name', 'university', 'hometown')


class ChatSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Chat
		fields = ('senderName', 'recipientName', 'messageContent', 'timestamp')


class ChatRoomSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = ChatRoom
		fields = ('chatters')

