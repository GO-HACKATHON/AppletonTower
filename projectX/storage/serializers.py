from rest_framework import serializers
from storage.models import Item

class FeedSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Item
        fields = ('driver_id','time', 'pollution', 'AQI', 'temp', 'humid', 'flood', 'hr', 'meditation', 'medState', 'attention', 'attState', 'lat', 'lng', 'distance', 'duration', 'driverStatus', 'rest')
