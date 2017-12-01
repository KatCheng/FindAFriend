from django.conf.urls import url
from django.conf.urls import include
from django.contrib import admin
from django.contrib.auth import views
from findafriend.views import home, signup, deleteUser, chatDirect
from rest_framework import routers
from .views import (PageDetail, PageSearch, PageRetrieve, ProfileViewSet, ProfileAPIView, 
UserCreateAPIView, UserLoginAPIView)
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [
	url(r'^api/pageSearch/$', PageSearch.as_view(), name='list'),
	url(r'^api/pageDetail/$', PageDetail.as_view(), name='detail'),
	url(r'^api/retrieve/(?P<title>[\w|\W]+)/$', PageRetrieve.as_view(), name='retrieve'),
	url(r'^api/profiles/(?P<user>[\w|\W]+)/$', ProfileAPIView.as_view(), name='profiles'),
	url(r'^api/login/$', UserLoginAPIView.as_view(), name='login'),
 	url(r'^api/register/$', UserCreateAPIView.as_view(), name='register'),
 	# url(r'^api/logout/$', UserLogoutAPIView.as_view(), name='logout'),
]


#urlpatterns=format_suffix_patterns(urlpatterns) 