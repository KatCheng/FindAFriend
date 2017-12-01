from __future__ import unicode_literals

from rest_framework import viewsets
from tacos.newapi.serializers import UserSerializer, UserCreateSerializer, UserLoginSerializer, ProfileSerializer
from tacos.newapi.serializers import PageSerializer, ChatSerializer, ChatRoomSerializer
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.generics import CreateAPIView
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
from django.contrib.auth import get_user_model



import json
# from . import authentication
# from django.contrib.auth import login, logout

User = get_user_model()
user = User.objects.get(username="aollarve")

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
			# account = authenticate(email='aollarve@u.rochester.edu', password='123andres')
			# account = authenticate(username='aollarve', password='123andres')
			# # account  = authenticate(username=username, password=password)
			user = User.objects.get(username=data['username'])
			user.backend = 'django.contrib.auth.backends.ModelBackend'
			if user.is_authenticated:
				print(user.username)
			#login(self.request, account)
			# credentials = {
   #          	self.username_field: attrs.get(self.username_field),
   #          	'password': attrs.get('password')
   #      	}
			return Response(new_data, status=HTTP_200_OK)
		else:
			return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

	# @app.after_request
	# def allow_cross_domain(response: flask.Response):
	#    	"""Hook to set up response headers."""
	#     response.headers['Access-Control-Allow-Origin'] = '*'
	#     response.headers['Access-Control-Allow-Headers'] = 'content-type'
	#     return response

# class UserLogoutAPIView(APIView):
# 	permissions_classes = [AllowAny]

# 	def post(request, format=None):
# 	    logout(request)

# 	    return Response({}, status=status.HTTP_204_NO_CONTENT)


class PageViewSet(viewsets.ModelViewSet):

	queryset = Page.objects.all().order_by('-timeCreated')
	serializer_class = PageSerializer
	lookup_field = 'title'
	if user.is_authenticated:
		permission_classes = [AllowAny]



class ProfileViewSet(viewsets.ModelViewSet):

	queryset = UserProfile.objects.all().order_by('-user')
	serializer_class = ProfileSerializer
	lookup_field = 'user'
	if user.is_authenticated:
		permission_classes = [AllowAny]

class ProfileAPIView(generics.RetrieveAPIView):
	queryset = UserProfile.objects.all()
	serializer_class = ProfileSerializer
	lookup_field = 'user'
	if user.is_authenticated:
		permission_classes = [AllowAny]


class ProfileUpdateView(generics.UpdateAPIView):
	queryset = UserProfile.objects.all()
	serializer_class = ProfileSerializer
	lookup_field = 'user'
	if user.is_authenticated:
		permission_classes = [AllowAny]


class ChatViewSet(viewsets.ModelViewSet):

	queryset = Chat.objects.all().order_by('-timestamp')
	serializer_class = ChatSerializer
	lookup_field = 'recipient'
	if user.is_authenticated:
		permission_classes = [AllowAny]

class ChatRoomViewSet(viewsets.ModelViewSet):

	queryset = ChatRoom.objects.all()
	serializer_class = ChatRoomSerializer
	if user.is_authenticated:
		permission_classes = [AllowAny]


class PageRetrieve(generics.RetrieveAPIView):
	queryset = Page.objects.all()
	serializer_class = PageSerializer
	lookup_field = 'title'
	if user.is_authenticated:
		permission_classes = [AllowAny]


class PageDetail(generics.RetrieveUpdateDestroyAPIView):

	queryset = Page.objects.all()
	serializer_class = PageSerializer
	if user.is_authenticated:
		permission_classes = [AllowAny]


class PageSearch(generics.ListAPIView):
	queryset = Page.objects.all()
	serializer_class = PageSerializer
	lookup_field = 'title'
	if user.is_authenticated:
		permission_classes = [AllowAny]

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



