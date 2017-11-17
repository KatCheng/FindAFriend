from __future__ import unicode_literals

from rest_framework import viewsets
from tacos.newapi.serializers import UserSerializer, ProfileSerializer
from tacos.newapi.serializers import PageSerializer, ChatSerializer, ChatRoomSerializer

from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect, get_object_or_404, HttpResponseRedirect

from django.template import RequestContext
from django.http import HttpResponse
from django.template.loader import get_template
from django.utils import timezone

from django.contrib.auth.models import User 
from django.forms.models import inlineformset_factory
from django.core.exceptions import PermissionDenied
from tacos.findafriend.models import Page, UserProfile, Chat, ChatRoom
from tacos.findafriend.forms import NewPageForm, UserDeleteForm, ChatForm 

import json

class UserViewSet(viewsets.ModelViewSet):

	queryset = User.objects.all().order_by('-date_joined')
	serializer_class = UserSerializer


class PageViewSet(viewsets.ModelViewSet):

	queryset = Page.objects.all().order_by('-timeCreated')
	serializer_class = PageSerializer


class ProfileViewSet(viewsets.ModelViewSet):

	queryset = UserProfile.objects.all().order_by('-user')
	serializer_class = ProfileSerializer


class ChatViewSet(viewsets.ModelViewSet):

	queryset = Chat.objects.all().order_by('-timeStamp')
	serializer_class = ChatSerializer


class ChatRoomViewSet(viewsets.ModelViewSet):

	queryset = ChatRoom.objects.all()
	serializer_class = ChatRoomSerializer


