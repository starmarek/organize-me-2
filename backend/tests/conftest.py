from datetime import datetime

import pytest
from django.conf import settings
from pytest_factoryboy import register

from .factories import ShiftFactory

register(ShiftFactory)


@pytest.fixture
def api_client():
    from rest_framework.test import APIClient

    return APIClient()


@pytest.fixture
def wrong_django_formatted_datetime():
    def format_date(datetime_obj=datetime(2021, 5, 1, 0, 0, 0)):
        return datetime.strftime(datetime_obj, settings.DATETIME_FORMAT[2:])

    return format_date


@pytest.fixture
def django_formatted_datetime():
    def format_date(datetime_obj=datetime(2021, 5, 1, 0, 0, 0)):
        return datetime.strftime(datetime_obj, settings.DATETIME_FORMAT)

    return format_date
