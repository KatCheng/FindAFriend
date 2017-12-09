from __future__ import unicode_literals

from rest_framework import viewsets
from tacos.newapi.serializers import UserSerializer, UserCreateSerializer, UserLoginSerializer, ProfileSerializer, PageCreateSerializer
from tacos.newapi.serializers import PageSerializer, ChatSerializer
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
from findafriend.models import Page, UserProfile, Chat

from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt 
#from rest_framework.renderers import JSONRenderer
#from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from tacos.newapi.permissions import IsOwnerOrReadOnly



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

class DeleteGroupSet(viewsets.ModelViewSet):
	serializer_class = PageSerializer
	queryset = Page.objects.all()
	lookup_field = 'title'
	permission_classes = [AllowAny]

	def get_queryset(self):
		queryset = Page.objects.all().filter(title= self.kwargs['group'])
		queryset[0].delete()
		return queryset


class UpdateGroupSet(viewsets.ModelViewSet):
	serializer_class = PageSerializer
	queryset = Page.objects.all()
	lookup_field = 'title'
	permission_classes = [AllowAny]

	def get_queryset(self):
		queryset = Page.objects.all().filter(title= self.kwargs['group'])
		queryset.update(description=self.kwargs['description'])
		queryset.update(typeOfGroup=self.kwargs['type'])		
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
			account.backend = 'django.contrib.auth.backends.ModelBackend'
			if account.is_authenticated:
				print("au")
			return Response(new_data, status=HTTP_200_OK)
		else:
			return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

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
	permission_classes = [IsOwnerOrReadOnly,]
	queryset = User.objects.all()
	serializer_class = UserSerializer
	lookup_field = 'user'

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

class UpdateProfile(viewsets.ModelViewSet):

	serializer_class = ProfileSerializer
	queryset = UserProfile.objects.all()
	lookup_field = 'username'
	permission_classes = [AllowAny]

	def get_queryset(self):
		queryset = UserProfile.objects.all().filter(user= self.kwargs['user'])
		queryset.update(first_name=self.kwargs['first_name'])
		queryset.update(last_name=self.kwargs['last_name'])	
		queryset.update(hometown=self.kwargs['hometown'])
		queryset.update(university=self.kwargs['university'])	
		queryset.update(picture=self.kwargs['picture'])
		return queryset

class DeleteUser(viewsets.ModelViewSet):
	serializer_class = UserSerializer
	queryset = User.objects.all()
	lookup_field = 'username'
	permission_classes = [AllowAny]

	def get_queryset(self):
		queryset = User.objects.all().filter(username= self.kwargs['user'])
		queryset[0].delete()
		return queryset


class ChatViewSet(viewsets.ModelViewSet):

	queryset = Chat.objects.all().order_by('-timestamp')
	serializer_class = ChatSerializer
	lookup_field = 'recipient'

