from django.contrib import admin
from django.urls import include, path
from rest_framework import routers

from .shifts.views import ShiftCalendarSpecificView, ShiftView
from .workers.views import WorkerView

router = routers.DefaultRouter()
router.register("workers", WorkerView)
router.register("shifts", ShiftView)
router.register("calendar", ShiftCalendarSpecificView)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include(router.urls)),
]
