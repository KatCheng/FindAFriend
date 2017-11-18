from django import forms

from .models import Page
from django.contrib.auth.models import User

class NewPageForm(forms.ModelForm):
    class Meta:
        model = Page
        fields = ('title', 'sizeOfGroup','groupTypes', 'description')

class UserProfileForm(forms.ModelForm):
	class Meta:
		model = User
		fields = ('first_name', 'last_name', 'email')

class UserDeleteForm(forms.Form):
    password = forms.CharField()

class ChatForm(forms.Form):
    message = forms.CharField()
