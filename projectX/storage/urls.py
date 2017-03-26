from django.conf.urls import  url, include

from rest_framework import routers
from storage import views

router = routers.DefaultRouter()
router.register(r'feed', views.FeedViewSet)

urlpatterns = [
    url(r'^$', views.cerebro, name='cerebro'),
    url(r'^api/', include(router.urls)),
]