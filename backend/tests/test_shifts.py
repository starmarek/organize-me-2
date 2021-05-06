from datetime import datetime

import pytest


@pytest.mark.django_db
def test_shift_view_list_return_400_if_start_end_params_missing(api_client):
    resp = api_client.get("/shifts/")

    assert resp.status_code == 400


@pytest.mark.django_db
def test_shift_view_list_return_400_if_datetime_in_wrong_format(
    api_client, wrong_django_formatted_datetime, shift
):
    resp = api_client.get(
        f"/shifts/?start={wrong_django_formatted_datetime()}&end={wrong_django_formatted_datetime()}"
    )

    assert resp.status_code == 400


@pytest.mark.django_db
def test_shift_view_list_return_200(api_client, django_formatted_datetime, shift):
    resp = api_client.get(
        f"/shifts/?start={django_formatted_datetime()}&end={django_formatted_datetime()}"
    )

    assert resp.status_code == 200


@pytest.mark.django_db
def test_shift_view_list_return_all_shift_objects(
    api_client, django_formatted_datetime, shift_factory
):
    amount = 10
    shift_factory.create_batch(amount)

    resp = api_client.get(
        f"/shifts/?start={django_formatted_datetime()}&end={django_formatted_datetime()}"
    )

    assert len(resp.data) == amount


@pytest.mark.django_db
def test_shift_view_list_transform_recurrences_to_datetime(
    api_client, django_formatted_datetime, shift
):
    resp = api_client.get(
        f"/shifts/?start={django_formatted_datetime()}&end={django_formatted_datetime(datetime(2021, 5, 2, 0, 0, 0))}",
    )

    assert isinstance(resp.data[0]["recurrences"][0], datetime)
