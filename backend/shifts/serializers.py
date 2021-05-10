from datetime import datetime, timedelta

from django.conf import settings
from rest_framework import serializers

from .models import Shift


def expand_recurrences(obj, range_start, range_end):
    return obj.recurrences.between(
        datetime.strptime(range_start, settings.DATETIME_FORMAT),
        datetime.strptime(range_end, settings.DATETIME_FORMAT),
        dtstart=obj.first_occurrence,
        inc=True,
    )


class ShiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shift
        fields = "__all__"

    def to_representation(self, obj):
        data = super().to_representation(obj)
        range_start = self.context["range_start"]
        range_end = self.context["range_end"]

        data["recurrences"] = expand_recurrences(obj, range_start, range_end)

        return data


class ShiftCalendarSpecificSerializer(serializers.ModelSerializer):
    events = serializers.SerializerMethodField()

    class Meta:
        model = Shift
        exclude = ["recurrences", "duration", "first_occurrence"]

    def get_events(self, obj):
        range_start = self.context["range_start"]
        range_end = self.context["range_end"]

        recurrences_list = expand_recurrences(obj, range_start, range_end)

        return [
            {"start": recurrence, "end": recurrence + timedelta(hours=obj.duration)}
            for recurrence in recurrences_list
        ]
