from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from storage.serializers import FeedSerializer
from storage.models import Item
from rest_framework import viewsets
from django.http import HttpResponse
import json
import requests
import numpy as np

class FeedViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Item.objects.all()
    serializer_class = FeedSerializer

@csrf_exempt
def cerebro(request):
    if request.method == "POST":
        
        # from android
        form = request.POST
        attention = form['attention']
        meditation = form['meditation']
        lng = form['lat']
        lat = form['lng']       
        hr = form['hr']

        # get data from AirVisual
        data = requests.get('http://api.airvisual.com/v2/nearest_city?lat=-6.21462&lon=106.84513&key=4HYxLdYrtiJ7XC4oD').json()        
        pollution = data['data']['current']['pollution']['aqius']
        temp = data['data']['current']['weather']['tp']
        humid = data['data']['current']['weather']['hu']

        # insert to database 
        item = Item.objects.create(pollution=pollution, temp=temp, humid=humid, meditation=meditation, attention=attention, hr=hr, lat=lat, lng=lng)
        trip = np.random.randint(2,15)
        item.duration = np.abs(1 * np.random.randn() + trip) * 60
        item.distance = np.sum(3 * np.random.randn(trip) + 5)
        item.save()
        # db.session.commit()

        returnValue = {}
        returnValue['duration'] = item.duration
        returnValue['distance'] = item.distance
        returnValue['driverStatus'] = item.driverStatus()
        returnValue['rest'] = item.rest
    
        return HttpResponse(json.dumps(returnValue), content_type="application/json")
