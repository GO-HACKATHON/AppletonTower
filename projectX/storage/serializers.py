from rest_framework import serializers
from storage.models import Item

class FeedSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Item
        fields = ('time', 'pollution', 'AQI', 'temp', 'humid', 'flood', 'hr', 'eeg', 'distance', 'duration')
