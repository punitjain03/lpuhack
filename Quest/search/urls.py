from audioop import add
from unicodedata import name
from django.urls import path


from . import views

urlpatterns = [
    path('',views.home,name='search'),
    path('search_person',views.search_person,name='search_person'),
    
    
]
