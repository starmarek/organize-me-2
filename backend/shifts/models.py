from django.db import models
from recurrence.fields import RecurrenceField


class Shift(models.Model):
    recurrences = RecurrenceField()
    first_occurrence = models.DateTimeField()
    duration = models.IntegerField()
