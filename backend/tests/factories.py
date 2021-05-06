from datetime import datetime

import factory

from ..shifts.models import Shift


class ShiftFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Shift

    recurrences = "RRULE:FREQ=DAILY"
    first_occurrence = datetime(2021, 5, 1, 0, 0, 0)
    duration = 8
