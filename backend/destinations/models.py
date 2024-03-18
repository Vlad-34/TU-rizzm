from django.db import models

class Destination(models.Model):
    name = models.CharField(max_length=63)
    description = models.TextField(max_length=255, null=True, blank=True)
    image = models.ImageField(upload_to='destinations/static/images/', null=True, blank=True)
    location = models.CharField(max_length=63, null=True, blank=True)
    price = models.IntegerField( null=True, blank=True) 
    offer = models.IntegerField(null=True, blank=True)
    capacity = models.IntegerField(null=True, blank=True)
    
    def __str__(self): 
        return self.name + ' | ' + self.description
