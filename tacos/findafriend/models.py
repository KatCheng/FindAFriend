# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.utils import timezone
from django.db import models
from django.contrib.auth.models import User # profile
from django.db.models.signals import post_save # profile
from django.core.validators import MinValueValidator # profile
import json

GROUPTYPES=(('social', 'social'),
			('academic', 'academic'),
			('carpool', 'carpool'),
			('others', 'others'))

class Page(models.Model):
	title = models.CharField(max_length=200)
	creator = models.ForeignKey('auth.User')
	sizeOfGroup = models.PositiveIntegerField(validators=[MinValueValidator(2)])
	groupTypes = models.CharField(max_length=15, choices=GROUPTYPES)
	description = models.TextField()
	timeCreated = models.DateTimeField(default=timezone.now)
	members = models.ManyToManyField(User, related_name='members')

	def __str__(self):
		return self.title

	def __str__(self):
		return 'Members:' + ' '.join(map(lambda u: u.__str__(), self.members.all()))

class UserProfile(models.Model):
	user = models.OneToOneField(User, null=True, related_name='user')
<<<<<<< HEAD
	#first_name = models.CharField(max_length=30, blank=True)
	#last_name = models.CharField(max_length=30, blank=True)
=======
	first_name = models.CharField(max_length=30, default='', blank=True)
	last_name = models.CharField(max_length=30, default='', blank=True)
>>>>>>> django_rest
	university = models.CharField(max_length=30, default='', blank=True)
	hometown = models.CharField(max_length=30, default='', blank=True)
	group_member = models.ManyToManyField(Page, related_name='groups')


	def __str__(self):
		return self.user.username

def create_profile(sender, **kwargs):
	user = kwargs["instance"]
	if kwargs["created"]:
		user_profile = UserProfile(user=user)
		user_profile.save()
post_save.connect(create_profile, sender=User)

class Chat(models.Model):
    senderName = models.CharField(max_length=150)
    recipientName = models.CharField(max_length=150) 
    messageContent = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def toJSON (self): 
        return json.dumps({"sender": self.senderName, "recipient": self.recipientName, "message": self.messageContent, "time": self.timestamp})

    def __str__(self):
        return 'sender: %s recipient: %s message: %s time: %s' % (self.senderName, self.recipientName, self.messageContent, self.timestamp)

class ChatRoom(models.Model):
    chatters = models.ManyToManyField(User)

    def __str__(self):
        return 'In Chat:' + ' '.join(map(lambda u: u.__str__(), self.chatters.all()))
