from django.conf.urls import patterns, url, include

from rest_framework import routers
from storage import views

router = routers.DefaultRouter()
router.register(r'feed', views.FeedViewSet)

urlpatterns = patterns('',
    #..... url lainnya disini...
    url(r'^api/', include(router.urls)),
)