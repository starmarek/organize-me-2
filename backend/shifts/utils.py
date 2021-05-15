from datetime import datetime

from django.conf import settings


def expand_recurrences(obj, range_start, range_end):
    return obj.recurrences.between(
        datetime.strptime(range_start, settings.DATETIME_FORMAT),
        datetime.strptime(range_end, settings.DATETIME_FORMAT),
        dtstart=obj.first_occurrence,
        inc=True,
    )
