from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Item (models.Model):
    time = models.DateTimeField()
    pollution = models.IntegerField(default=0)
    def AQI (self):
    	if self.pollution < 51:
    		return "Bad"
    	elif self.pollution >= 51 or self.polltion < 100:
    		return "Moderate"
    	else:
    		return "Good"

    temp = models.IntegerField(default=0)
    humid = models.IntegerField(default=0)
    flood = models.IntegerField(default=0)
    eeg = models.IntegerField(default=0)
    hr = models.IntegerField(default=0)
    distance = models.IntegerField(default=0)
    duration = models.IntegerField(default=0)

    def __unicode__(self):
        return self.time

