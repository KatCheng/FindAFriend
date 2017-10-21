from django import forms

from .models import Group

class NewGroupForm(forms.ModelForm):

    class Meta:
        model = Group
        fields = ('title', 'sizeOfGroup','description')