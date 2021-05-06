import logging
from datetime import datetime

from django.conf import settings
from rest_framework import viewsets
from rest_framework.response import Response

from .models import Shift
from .serializers import ShiftSerializer

log = logging.getLogger("django")


class ShiftView(viewsets.ModelViewSet):
    serializer_class = ShiftSerializer
    queryset = Shift.objects.all()

    def list(self, request, *args, **kwargs):
        start = request.query_params.get("start")
        end = request.query_params.get("end")
        if not (start and end):
            return Response(
                {"error": "'start' or/and 'end' query params are missing"},
                status=400,
            )
        queryset = self.filter_queryset(self.get_queryset())
        data = self.get_serializer(queryset, many=True).data

        for i, shift in enumerate(queryset):
            # django-recurrence need to iter over real objects
            # in order to generate recurrence datetimes
            try:
                data[i]["recurrences"] = shift.recurrences.between(
                    datetime.strptime(start, settings.DATETIME_FORMAT),
                    datetime.strptime(end, settings.DATETIME_FORMAT),
                    dtstart=shift.first_occurrence,
                    inc=True,
                )
            except ValueError:
                return Response(
                    {
                        "error": f"Your query params {start} or {end} do not match datetime format {settings.DATETIME_FORMAT}"
                    },
                    status=400,
                )

        return Response(data)
