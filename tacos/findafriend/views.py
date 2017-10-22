# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect, get_object_or_404

from django.http import HttpResponse
from django.template.loader import get_template
from django.utils import timezone
from .forms import NewPageForm
from .models import Page


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


@login_required
def newGroup(request):
    if request.method == "POST":
        form = NewPageForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            post.creator = request.user
            post.timeCreated = timezone.now()
            post.save()
            return redirect('home')
    else:
        form = NewPageForm()
    return render(request, 'findafriend/create_group.html', {'form': form})