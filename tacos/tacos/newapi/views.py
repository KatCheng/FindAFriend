from __future__ import unicode_literals

from rest_framework import viewsets
from tacos.newapi.serializers import UserSerializer, UserCreateSerializer, UserLoginSerializer, ProfileSerializer
from tacos.newapi.serializers import PageSerializer, ChatSerializer, ChatRoomSerializer
from django.db.models import Q
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import 

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
from findafriend.models import Page, UserProfile, Chat, ChatRoom
from findafriend.forms import NewPageForm, UserDeleteForm, ChatForm

from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt 
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest_framework import generics

import json

class UserViewSet(viewsets.ModelViewSet):

	queryset = User.objects.all().order_by('-date_joined')
	serializer_class = UserSerializer


class PageViewSet(viewsets.ModelViewSet):

	queryset = Page.objects.all().order_by('-timeCreated')
	serializer_class = PageSerializer
	lookup_field = 'title'


class ProfileViewSet(viewsets.ModelViewSet):

	queryset = UserProfile.objects.all().order_by('-user')
	serializer_class = ProfileSerializer
	lookup_field = 'user'

class ProfileAPIView(generics.RetrieveAPIView):
	queryset = UserProfile.objects.all()
	serializer_class = ProfileSerializer
	lookup_field = 'user'


class ProfileUpdateView(generics.UpdateAPIView):
	queryset = UserProfile.objects.all()
	serializer_class = ProfileSerializer
	lookup_field = 'user'



class ChatViewSet(viewsets.ModelViewSet):

	queryset = Chat.objects.all().order_by('-timestamp')
	serializer_class = ChatSerializer


class ChatRoomViewSet(viewsets.ModelViewSet):

	queryset = ChatRoom.objects.all()
	serializer_class = ChatRoomSerializer


class PageRetrieve(generics.RetrieveAPIView):
	queryset = Page.objects.all()
	serializer_class = PageSerializer
	lookup_field = 'title'


class PageDetail(generics.RetrieveUpdateDestroyAPIView):

	queryset = Page.objects.all()
	serializer_class = PageSerializer


class PageSearch(generics.ListAPIView):
	queryset = Page.objects.all()
	serializer_class = PageSerializer
	lookup_field = 'title'

	def get_queryset(self, *args, **kwargs):
		#queryset_list = super(PageSearch, self).get_queryset(*args, **kwargs)
		queryset_list = Page.objects.all()
		query = self.request.GET.get("q")
		if query:
			queryset_list = queryset_list.filter(
				Q(title_icontains=query)|
				Q(content_icontains=query)
				).distinct()
		return queryset_list




