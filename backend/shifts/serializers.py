from rest_framework import serializers

from .models import Shift
from .utils import expand_recurrences


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
