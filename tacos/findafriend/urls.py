from django.conf.urls import url
from . import views

urlpatterns = [
	url(r'^newGroup/$', views.newGroup, name='newGroup'),
	url(r'^editProfile/$', views.editProfile, name='editProfile'),
<<<<<<< HEAD
	url(r'^viewProfile/$', views.viewProfile, name='viewProfile')
=======
	#url(r'^search/$', views.groupSearch, name='search')
	
>>>>>>> django_rest
]