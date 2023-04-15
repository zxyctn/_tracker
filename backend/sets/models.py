from django.db import models

from fields.models import Field


class Set(models.Model):
    GOAL_TYPES = [
        ("REP", "Reps"),
        ("CAL", "Calories"),
        ("DUR", "Duration"),
        ("DIS", "Distance"),
    ]

    GOAL_UNITS = {
        ("m", "Minutes"),
        ("h", "Hours"),
        ("km", "Kilometers"),
        ("mi", "Miles"),
    }

    fields = models.ManyToManyField(Field, related_name="sets")
    goal = models.CharField(max_length=3, choices=GOAL_TYPES)
    unit = models.CharField(max_length=2, choices=GOAL_UNITS, blank=True)
    value = models.IntegerField(default=0)
