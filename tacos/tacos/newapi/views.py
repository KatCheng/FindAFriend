from __future__ import unicode_literals

from rest_framework import viewsets
from tacos.newapi.serializers import UserSerializer

from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect, get_object_or_404, HttpResponseRedirect

from django.template import RequestContext
from django.http import HttpResponse
from django.template.loader import get_template
from django.utils import timezone

from django.contrib.auth.models import User 
from django.forms.models import inlineformset_factory
from django.core.exceptions import PermissionDenied

import json

class UserViewSet(viewsets.ModelViewSet):

	queryset = User.objects.all().order_by('-date_joined')
	serializer_class = UserSerializer

