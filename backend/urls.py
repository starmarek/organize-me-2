from django.contrib import admin
from django.urls import include, path
from rest_framework import routers

from .workers.views import WorkersView

router = routers.DefaultRouter()
router.register("workers", WorkersView)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include(router.urls)),
]
