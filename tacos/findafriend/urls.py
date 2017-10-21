from django.conf.urls import url
from . import views

urlpatterns = [
	url(r'^newGroup/$', views.newGroup, name='newGroup'),

]