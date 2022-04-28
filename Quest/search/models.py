from unicodedata import name
from django.db import models

# Create your models here.
class Search(models.Model):
    name = models.CharField(max_length=50)
    state = models.CharField(max_length=35)
    district = models.CharField(max_length=35)
    father_name = models.CharField(max_length=35)
    