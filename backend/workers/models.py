from django.db import models
from django.utils.translation import gettext_lazy as _

from ..shifts.models import Shift


class Worker(models.Model):
    class PreferredShift(models.TextChoices):
        DAY = "D", _("Day")
        NIGHT = "N", _("Night")

    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    preferred_shift = models.CharField(
        max_length=5,
        choices=PreferredShift.choices,
        default=None,
        null=True,
    )
    preferred_coworkers = models.ManyToManyField("self", blank=True)
    public_id = models.IntegerField(null=True)
    shifts = models.ManyToManyField(Shift)

    def __str__(self):
        str_repr = f"{self.first_name} {self.last_name}"
        if self.public_id:
            str_repr += f" ({self.public_id})"
        return str_repr

    def save(self, *args, **kwargs):
        same_name_worker = (
            Worker.objects.filter(first_name=self.first_name, last_name=self.last_name).order_by("public_id").first()
        )
        if same_name_worker:
            self.public_id = same_name_worker.public_id + 1 if same_name_worker.public_id else 2

        super(Worker, self).save(*args, **kwargs)
