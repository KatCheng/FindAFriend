# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect, get_object_or_404, HttpResponseRedirect

from django.template import RequestContext
from django.http import HttpResponse
from django.template.loader import get_template
from django.utils import timezone
from .forms import NewPageForm, UserDeleteForm, ChatForm, SearchForm
from .models import Page

from django.contrib.auth.models import User 
from .models import UserProfile
from .forms import UserProfileForm
from django.forms.models import inlineformset_factory
from django.core.exceptions import PermissionDenied
from .models import Chat

#Below imports are from REST framework
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt 
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser

from rest_framework import serializers
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from tacos.newapi.serializers import UserSerializer, ProfileSerializer
from tacos.newapi.serializers import PageSerializer, ChatSerializer, ChatRoomSerializer
from tacos.newapi import views


import json


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
    #return Response('registration/signup.html', {'form': form})
    return render(request, 'registration/signup.html', {'form': form})

def home(request):
    #return Response(get_template('findafriend/home.html').render({'user':request.user, 'chatform': ChatForm()}))
    return HttpResponse(get_template('findafriend/home.html').render({'user':request.user, 'chatform': ChatForm()}))


@login_required
#@api_view(['GET', 'POST'])
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

@login_required
def editProfile(request):
    #user = User.objects.get(pk=pk) # Querying with pk from url
    pk = request.user.pk
    user = User.objects.get(pk=pk)
    form = UserProfileForm(data=request.POST, instance=user)

    ProfileInlineFormset = inlineformset_factory(User, UserProfile, fields=('university', 'hometown'))
    formset = ProfileInlineFormset(instance=user)

    if request.user.is_authenticated() and request.user.id == user.id:
        if request.method == "POST":
            form = UserProfileForm(request.POST, request.FILES, instance=user)
            formset = ProfileInlineFormset(request.POST, request.FILES, instance=user)

            if form.is_valid():
                created_profile = form.save(commit=False)
                formset = ProfileInlineFormset(request.POST, request.FILES, instance=created_profile)
                
                if formset.is_valid():
                    created_profile.save()
                    formset.save()
            return redirect('home')

        return render(request, 'findafriend/profile_update.html', {
            "noodle": pk,
            'noodle_form': form,
            'formset': formset,
        })
    else:
        raise PermissionDenied
    return render(request, 'findafriend/create_group.html', {'form': form})
    
def viewProfile(request):
	context=locals()
	return render(request, 'findafriend/profile.html', context)

@login_required
def deleteUser(request):
    if request.method == "POST":
        
        targetUser = User.objects.get(username=request.user.get_username())
        if authenticate(username = request.user.get_username(),password = request.POST['password']): 
            logout(request)
            targetUser.delete()
            return render(request, 'findafriend/delete_success.html')
        else:
            return render(request, 'findafriend/delete_failure.html')
    elif request.method == "GET":
        return render(request, 'findafriend/delete_user.html', {'form': UserDeleteForm()}, RequestContext(request))
    else:
        return HttpResponse(status=400)
    

def newMessage(request):
    if request.method == "POST":
        chat = json.JSONDecoder.decode(request.body)
        Chat(
                senderName=chat.senderName,
                recipientName=chat.recipientName,
                messageContent=chat.messageContent
        ).save()
        return HttpResponse(status=200)
    else: 
        return HttpResponse(status=404)

def chatDirect(request, recipient):
    return render(request, "findafriend/room.html", {
        'chatform': ChatForm(),
        'recipient': recipient,
        })


