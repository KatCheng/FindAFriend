# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.forms import UserCreationForm
<<<<<<< HEAD
from django.shortcuts import render, redirect, get_object_or_404, HttpResponseRedirect
=======
from django.shortcuts import render, redirect, get_object_or_404
>>>>>>> 2ae3db6390a6f14e9b221fcbc7226c9fd33652c4

from django.http import HttpResponse
from django.template.loader import get_template
from django.utils import timezone
from .forms import NewPageForm
from .models import Page

<<<<<<< HEAD
from django.contrib.auth.models import User 
from .models import UserProfile
from .forms import UserProfileForm
from django.forms.models import inlineformset_factory
from django.core.exceptions import PermissionDenied

=======
>>>>>>> 2ae3db6390a6f14e9b221fcbc7226c9fd33652c4

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
<<<<<<< HEAD
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
            form = UserProfileForm(instance=user)
            formset = ProfileInlineFormset(request.POST, instance=user)

            if form.is_valid():
                created_profile = form.save(commit=False)
                formset = ProfileInlineFormset(request.POST, instance=created_profile)
                
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
=======
    return render(request, 'findafriend/create_group.html', {'form': form})
>>>>>>> 2ae3db6390a6f14e9b221fcbc7226c9fd33652c4
