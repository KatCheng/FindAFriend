# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.utils import timezone
from django.db import models

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