# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.template.loader import get_template
from .forms import NewGroupForm
from .models import Group


def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('home')
    else:
        form = UserCreationForm()
    return render(request, 'registration/signup.html', {'form': form})

def home(request):
    users = {'user':request.user}
    return HttpResponse(get_template('findafriend/home.html').render(users))

def newGroup(request):
    if request.method == "POST":
        form = NewGroupForm(request.POST)
        if form.is_valid():
            post = form.save()
            post.creator = {'user':request.user}
            post.timeCreated = timezone.now()
            post.save()
            return redirect('home')
    else:
        form = NewGroupForm()
    return render(request, 'findafriend/create_group.html', {'form': form})