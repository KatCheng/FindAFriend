from __future__ import unicode_literals

from rest_framework import viewsets
from tacos.newapi.serializers import UserSerializer, UserCreateSerializer, UserLoginSerializer, ProfileSerializer, PageCreateSerializer
from tacos.newapi.serializers import PageSerializer, ChatSerializer, ChatRoomSerializer
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.generics import CreateAPIView, UpdateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

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
from rest_framework.response import Response


import json

class JoinGroupSet(viewsets.ModelViewSet):
	serializer_class = PageSerializer
	queryset = Page.objects.all()
	lookup_field = 'title'
	permission_classes = [AllowAny]

	def get_queryset(self):
		queryset = Page.objects.all().filter(title= self.kwargs['group'])
		lookup_field = 'title'
		userq = User.objects.all().filter(username = self.kwargs['username'])
		queryset[0].members.add(userq[0])
		return queryset


class LeaveGroupSet(viewsets.ModelViewSet):
	serializer_class = PageSerializer
	queryset = Page.objects.all()
	lookup_field = 'title'
	permission_classes = [AllowAny]

	def get_queryset(self):
		queryset = Page.objects.all().filter(title= self.kwargs['group'])
		lookup_field = 'title'
		userq = User.objects.all().filter(username = self.kwargs['username'])
		queryset[0].members.remove(userq[0])
		return queryset


class UserViewSet(viewsets.ModelViewSet):

	queryset = User.objects.all().order_by('-date_joined')
	serializer_class = UserSerializer
	permission_classes = [AllowAny]

class UserCreateAPIView(CreateAPIView):  # Sing up

	queryset = User.objects.all()
	serializer_class = UserCreateSerializer
	permission_classes = [AllowAny]

class UserLoginAPIView(APIView):
	serializer_class = UserLoginSerializer
	permission_classes = [AllowAny]

	def post(self, request, *args, **kwargs):
		data = request.data
		serializer = UserLoginSerializer(data=data)
		if serializer.is_valid(raise_exception=True):
			new_data = serializer.data
			account = User.objects.get(username=data['username'])
			#account = authenticate(username=data['username'])
			account.backend = 'django.contrib.auth.backends.ModelBackend'
			if account.is_authenticated:
				print("au")
			return Response(new_data, status=HTTP_200_OK)
		else:
			return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

	# @app.after_request
	# def allow_cross_domain(response: flask.Response):
	#    	"""Hook to set up response headers."""
	#     response.headers['Access-Control-Allow-Origin'] = '*'
	#     response.headers['Access-Control-Allow-Headers'] = 'content-type'
	#     return response



class PageViewSet(viewsets.ModelViewSet):

	queryset = Page.objects.all().order_by('-timeCreated')
	serializer_class = PageSerializer
	lookup_field = 'title'
	permission_classes = [AllowAny]

class PageCreateAPIView(CreateAPIView):

	queryset = Page.objects.all()
	serializer_class = PageCreateSerializer
	lookup_field = 'title'
	permission_classes = [AllowAny]

class ProfileViewSet(viewsets.ModelViewSet):
	queryset = UserProfile.objects.all().order_by('-user')
	serializer_class = ProfileSerializer
	lookup_field = 'user'

class ProfileAPIView(generics.RetrieveAPIView):
	queryset = User.objects.all()
	serializer_class = UserSerializer
	lookup_field = 'user'

class MessageFilter(viewsets.ModelViewSet):
	serializer_class = ChatSerializer
	queryset = Chat.objects.all()

	def get_queryset(self):
		queryset= Chat.objects.all().filter(title= self.recipient.kwargs['group'])
		return queryset

class ProfileUpdateView(UpdateAPIView):
	queryset = User
	serializer_class = UserSerializer

	def get_object(self):
		return User.objects.get(username=self.request.user)

	def patch(self, request, format=None):

  		user = UserSerializer(data=request.data)

  		if user.is_valid():
  			user.update(instance=request.user)
  			return Response(HTTP_200_OK)

  		return Response(user.errors)


# class ProfileUpdateAPIView(UpdateAPIView):
# 	queryset = UserProfile.objects.all()
# 	serializer_class = ProfileUpdateSerializer
# 	#lookup_field = 'user'

	# def get_object(self):
	# 	return UserProfile.objects.get(user=self.request.user)
		



class ChatViewSet(viewsets.ModelViewSet):

	queryset = Chat.objects.all().order_by('-timestamp')
	serializer_class = ChatSerializer
	lookup_field = 'recipient'


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





