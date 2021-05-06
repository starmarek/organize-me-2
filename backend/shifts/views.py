from datetime import datetime

from django.conf import settings
from rest_framework import viewsets
from rest_framework.response import Response

from .models import Shift
from .serializers import ShiftCalendarSpecificSerializer, ShiftSerializer


def trydatetime(datetime_string):
    try:
        datetime.strptime(datetime_string, settings.DATETIME_FORMAT)
    except ValueError:
        return False

    return True


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
        if not (trydatetime(start) and trydatetime(end)):
            return Response(
                {
                    "error": f"Your query params {start} or {end} do not match datetime format {settings.DATETIME_FORMAT}"
                },
                status=400,
            )

        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(
            queryset, many=True, context={"range_start": start, "range_end": end}
        )

        return Response(serializer.data)


class ShiftCalendarSpecificView(viewsets.ModelViewSet):
    serializer_class = ShiftCalendarSpecificSerializer
    queryset = Shift.objects.all()

    def list(self, request, *args, **kwargs):
        start = request.query_params.get("start")
        end = request.query_params.get("end")
        if not (start and end):
            return Response(
                {"error": "'start' or/and 'end' query params are missing"},
                status=400,
            )
        if not (trydatetime(start) and trydatetime(end)):
            return Response(
                {
                    "error": f"Your query params {start} or {end} do not match datetime format {settings.DATETIME_FORMAT}"
                },
                status=400,
            )

        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(
            queryset, many=True, context={"range_start": start, "range_end": end}
        )

        return Response(serializer.data)
