from datetime import timedelta

from django.db import models
from recurrence.fields import RecurrenceField

from .utils import expand_recurrences


class Shift(models.Model):
    recurrences = RecurrenceField()
    first_occurrence = models.DateTimeField()
    duration = models.IntegerField()

    def event_list(self, range_start, range_end):
        recurrence_list = expand_recurrences(self, range_start, range_end)

        return [
            {"title": "Some shift", "start": recurrence, "end": recurrence + timedelta(hours=self.duration)}
            for recurrence in recurrence_list
        ]
