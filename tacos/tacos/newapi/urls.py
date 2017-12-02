from django.conf.urls import url
from django.conf.urls import include
from django.contrib import admin
from django.contrib.auth import views
from findafriend.views import home, signup, deleteUser, chatDirect
from rest_framework import routers
from .views import PageDetail, PageSearch, PageRetrieve, ProfileViewSet, ProfileAPIView, UserCreateAPIView, UserLoginAPIView, PageCreateAPIView
from rest_framework.urlpatterns import format_suffix_patterns
from .views import ProfileUpdateView

urlpatterns = [
	url(r'^api/pageSearch/$', PageSearch.as_view(), name='list'),
	url(r'^api/pageDetail/$', PageDetail.as_view(), name='detail'),
	url(r'^api/retrieve/(?P<title>[\w|\W]+)/$', PageRetrieve.as_view(), name='retrieve'),
	url(r'^api/profile/update/$', ProfileUpdateView.as_view(), name='update'),
	url(r'^api/profiles/$', ProfileAPIView.as_view(), name='profiles'),
	#url(r'^api/profiles/(?P<user>[\w.@+-]+)/$', ProfileAPIView.as_view(), name='profiles'),
	#url(r'^api/update/$', ProfileUpdateAPIView.as_view(), name='update'),
	url(r'^api/login/$', UserLoginAPIView.as_view(), name='login'),
 	url(r'^api/register/$', UserCreateAPIView.as_view(), name='register'),
 	url(r'^api/pageCreate/$', PageCreateAPIView.as_view(), name='pagecreate'),
]


#urlpatterns=format_suffix_patterns(urlpatterns) 