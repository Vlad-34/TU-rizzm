from django.db import models
from destinations.models import Destination

class Reservation(models.Model):
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    price = models.IntegerField(null=True, blank=True)
    reservation_date = models.DateField(null=True, blank=True)
    
    def __str__(self):
        return self.destination.name + ' | ' + str(self.reservation_date)
