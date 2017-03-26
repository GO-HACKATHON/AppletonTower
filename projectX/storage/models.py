from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
from datetime import datetime
import numpy as np


# Create your models here.
class Item (models.Model):
	driver_id = models.IntegerField(default=1)
	time = models.DateTimeField(default=datetime.now())
	pollution = models.IntegerField(default=0)
	def AQI (self):
		if self.pollution < 51:
			return "Bad"
		elif self.pollution >= 51 and self.pollution < 100:
			return "Moderate"
		else:
			return "Good"

	temp = models.IntegerField(default=0)
	humid = models.IntegerField(default=0)
	flood = models.IntegerField(default=0)
	meditation = models.IntegerField(default=0)
	def medState (self):
		if self.meditation < 65:
			return "awake"
		else:
			return "sleepy"
	attention = models.IntegerField(default=0)
	def attState (self):
		if self.attention < 41:
			return "not focus"
		else:
			return "focus"

	hr = models.IntegerField(default=0)
	lat = models.FloatField(default=0)
	lng = models.FloatField(default=0)
	distance = models.FloatField(default=0)
	duration = models.IntegerField(default=0)
	rest = models.IntegerField(default=0)
	# rules to specify the properness of driver
	def driverStatus(self):
		score = 0
		if self.medState != "awake":
			score += 1
		if self.attState != "focus":
			score += 1
		if int(self.hr) < 60 or int(self.hr) > 100:
			score += 1
		if self.duration > 600:
			score += 1
		if self.distance > 50:
			score += 1
		if self.flood == 0:
			score += 1
		if self.temp < 10 and self.temp > 37:
			score += 1
		if self.pollution > 50:
			score += 1
		fatigue = sigmoid(score, 0, 8)
		if fatigue > 0.7:
			self.rest = 60 * fatigue + 30
			return "NOT FIT"
		else:
			self.rest = 0
			return "FIT"

	@classmethod
	def create(cls, pollution, temp, humid, meditation, attention, hr, lat, lng):
		cls(driver_id = 1)
		cls(time = datetime.today())
		cls(pollution = pollution)
		cls(temp = temp)
		cls(humid = humid)
		cls(flood = np.random.randint(2))
		cls(meditation = meditation)
		cls(attention = attention)
		cls(hr = hr)
		cls(lat = lat)
		cls(lng = lng)
		cls(distance = 3 * np.random.randn() + 5)
		cls(duration = 1 * np.random.randn() + 8)
        

	# def __init__(self,  pollution, temp, humid, meditation, attention, hr, lat, lng, AQI, flood, time, driver_id, duration, distance):
	# 	self.driver_id = 1
	# 	self.time = datetime.today()
	# 	self.pollution = pollution
	# 	self.temp = temp
	# 	self.humid = humid
	# 	self.flood = np.random.randint(2)
	# 	self.meditation = meditation
	# 	self.attention = attention
	# 	self.hr = hr
	# 	self.lat = lat
	# 	self.lng = lng
	# 	self.distance = 3 * np.random.randn() + 5
	# 	self.duration = 1 * np.random.randn() + 8

	

	def __unicode__(self):
		return self.time

def sigmoid(x, a, c):
	b = a + float(c - a)/2
	if a <= x <= b:
		return 2 * (float(x-a)/(c-a))**2
	elif b < x <= c:
		return 1 - 2 * (float(c-x)/(c-a))**2
	elif x < a:
		return 0.
	elif x > c:
		return 1.