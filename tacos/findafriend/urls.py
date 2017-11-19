from django.conf.urls import url
from . import views

urlpatterns = [
	url(r'^newGroup/$', views.newGroup, name='newGroup'),
	url(r'^editProfile/$', views.editProfile, name='editProfile'),
	#url(r'^search/$', views.groupSearch, name='search')
	
]