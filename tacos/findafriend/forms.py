from django import forms

from .models import Page
<<<<<<< HEAD
from django.contrib.auth.models import User

class NewPageForm(forms.ModelForm):
    class Meta:
        model = Page
        fields = ('title', 'sizeOfGroup','description')

class UserProfileForm(forms.ModelForm):
	class Meta:
		model = User
		fields = ('first_name', 'last_name', 'email')
=======

class NewPageForm(forms.ModelForm):

    class Meta:
        model = Page
        fields = ('title', 'sizeOfGroup','description')
>>>>>>> 2ae3db6390a6f14e9b221fcbc7226c9fd33652c4
