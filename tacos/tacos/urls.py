from django.conf.urls import url
from django.conf.urls import include
from django.contrib import admin
from django.contrib.auth import views
from findafriend.views import home, signup, deleteUser, chatDirect
from rest_framework import routers
from tacos.newapi import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^accounts/signup/$', signup, name='signup'),
    url(r'^accounts/login/$', views.login, name='login'),
    url(r'^accounts/logout/$', views.logout, name='logout'),
    url(r'^$', home, name='home'),
    url(r'',include('findafriend.urls')),
    url(r'^accounts/delete/$', deleteUser, name='delete'),
    url(r'^chat/(?P<recipient>[\w-]+)/$', chatDirect, name='chat'),
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    
]
