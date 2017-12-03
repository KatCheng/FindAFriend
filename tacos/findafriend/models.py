# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.utils import timezone
from django.db import models
from django.contrib.auth.models import User # profile
from django.db.models.signals import post_save # profile
import json

SIZEOPTIONS =(
	('Under 5', 'Under 5'),
	('Under 20', 'Under 20'),
	('Under 50', 'Under 50'),
	('More than 50', 'More than 50'),
	)

GROUPOPTIONS = (
	('Sport', 'Sport'),
	('Academic', 'Academic'),
	('Business', 'Business'),
	('Other', 'Other'),
	)

PROFILEPIC = (
	(0, 'img-0.jpg'),
	(1, 'img-1.jpg'),
	(2, 'img-2.jpg'),
	(3, 'img-3.jpg'),
	(4, 'img-4.jpg'),
	(5, 'img-5.jpg'),
	)
class Page(models.Model):
	title = models.CharField(max_length=200, unique=True)
	creator = models.ForeignKey('auth.User')
	description = models.TextField()
	typeOfGroup = models.CharField(max_length=12, choices=GROUPOPTIONS, null=True)
	timeCreated = models.DateTimeField(default=timezone.now)
	members = models.ManyToManyField(User, related_name='members')

	def __str__(self):
		return self.title

	def __str__(self):
		return 'Members:' + ' '.join(map(lambda u: u.__str__(), self.members.all()))

class UserProfile(models.Model):
	#user = models.OneToOneField(User, null=True, related_name='profile')
	user = models.ForeignKey(User, related_name='profile')
	first_name = models.CharField(max_length=30, default='', blank=True)
	last_name = models.CharField(max_length=30, default='', blank=True)
	university = models.CharField(max_length=30, default='', blank=True)
	hometown = models.CharField(max_length=30, default='', blank=True)
	picture = models.IntegerField(default=0, choices=PROFILEPIC)
	#group_member = models.ManyToManyField(Page, related_name='groups')


	# def __str__(self):
	# 	return self.user.username

def create_profile(sender, **kwargs):
	user = kwargs["instance"]
	if kwargs["created"]:
		user_profile = UserProfile(user=user)
		user_profile.save()
post_save.connect(create_profile, sender=User)

class Chat(models.Model): 
    sender = models.ForeignKey(User)
    recipient = models.ForeignKey(Page)
    messageContent = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def toJSON (self): 
        return json.dumps({"sender": self.sender.username, "recipient": self.recipient.title, "message": self.messageContent, "time": self.timestamp})

    def __str__(self):
        return 'sender: %s recipient: %s message: %s time: %s' % (self.sender.username, self.recipient.title, self.messageContent, self.timestamp)

# Not Needed
class ChatRoom(models.Model):
   chatters = models.ManyToManyField(User)
    
