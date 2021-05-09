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


def return_drf_400_response_on_rangeparams_error(range_start, range_end):
    if not (range_start and range_end):
        return Response(
            {"error": "'start' or/and 'end' query params are missing"},
            status=400,
        )
    if not (trydatetime(range_start) and trydatetime(range_end)):
        return Response(
            {
                "error": f"Your query params {range_start} or {range_end} do not match datetime format {settings.DATETIME_FORMAT}"
            },
            status=400,
        )


class ShiftView(viewsets.ModelViewSet):
    serializer_class = ShiftSerializer
    queryset = Shift.objects.all()

    def get_serializer_class(self):
        if self.request.query_params.get("calendar_specific"):
            return ShiftCalendarSpecificSerializer
        return super().get_serializer_class()

    def list(self, request, *args, **kwargs):
        start = request.query_params.get("start")
        end = request.query_params.get("end")

        if resp := return_drf_400_response_on_rangeparams_error(start, end):
            return resp

        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(
            queryset, many=True, context={"range_start": start, "range_end": end}
        )

        return Response(serializer.data)
