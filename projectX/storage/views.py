from django.shortcuts import render
from storage.serializers import FeedSerializer
from storage.models import Item
from rest_framework import viewsets

class FeedViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Item.objects.all()
    serializer_class = FeedSerializer

