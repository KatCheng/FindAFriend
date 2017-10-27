from django.conf.urls import url
from django.conf.urls import include
from django.contrib import admin
from django.contrib.auth import views
from findafriend.views import home, signup, deleteUser

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^accounts/signup/$', signup, name='signup'),
    url(r'^accounts/login/$', views.login, name='login'),
    url(r'^accounts/logout/$', views.logout, name='logout'),
    url(r'^$', home, name='home'),
    url(r'',include('findafriend.urls')),
    url(r'^accounts/delete/$', deleteUser, name='delete'),
]
