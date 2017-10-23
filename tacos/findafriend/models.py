# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.utils import timezone
from django.db import models
from django.contrib.auth.models import User # profile
from django.db.models.signals import post_save # profile

SIZEOPTIONS =(
	('Under 5', 'Under 5'),
	('Under 5', 'Under 20'),
	('Under 20', 'Under 50'),
	('More than 50', 'More than 50'),
	)

class Page(models.Model):
	title = models.CharField(max_length=200)
	creator = models.ForeignKey('auth.User')
	sizeOfGroup = models.CharField(max_length=12, choices=SIZEOPTIONS)
	description = models.TextField()
	timeCreated = models.DateTimeField(default=timezone.now)

	def __str__(self):
		return self.title

class UserProfile(models.Model):
	user = models.OneToOneField(User, null=True, related_name='user')
#	first_name = models.CharField(max_length=30, blank=True)
#	last_name = models.CharField(max_length=30, blank=True)
	university = models.CharField(max_length=30, default='', blank=True)
	hometown = models.CharField(max_length=30, default='', blank=True)

	def __str__(self):
		return self.user.username

<<<<<<< HEAD
def create_profile(sender, **kwargs):
	user = kwargs["instance"]
	if kwargs["created"]:
		user_profile = UserProfile(user=user)
		user_profile.save()
post_save.connect(create_profile, sender=User)
=======
SIZEOPTIONS =(
	('Under 5', 'Under 5'),
	('Under 5', 'Under 20'),
	('Under 20', 'Under 50'),
	('More than 50', 'More than 50'),
	)

class Page(models.Model):
	title = models.CharField(max_length=200)
	creator = models.ForeignKey('auth.User')
	sizeOfGroup = models.CharField(max_length=12, choices=SIZEOPTIONS)
	description = models.TextField()
	timeCreated = models.DateTimeField(default=timezone.now)

	def __str__(self):
		return self.title
>>>>>>> 2ae3db6390a6f14e9b221fcbc7226c9fd33652c4
