from django.conf.urls import url
from . import views

urlpatterns = [
	url(r'^newGroup/$', views.newGroup, name='newGroup'),
<<<<<<< HEAD
	url(r'^editProfile/$', views.editProfile, name='editProfile'),
=======

>>>>>>> 2ae3db6390a6f14e9b221fcbc7226c9fd33652c4
]