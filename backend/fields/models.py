from django.db import models


class Field(models.Model):
    FIELD_TYPES = [
        ("W", "Weights"),
        ("S", "Speed"),
        ("D", "Difficulty"),
        ("E", "Elevation"),
    ]

    FIELD_UNITS = {
        ("kg", "Kilograms"),
        ("lbs", "Pounds"),
        ("kph", "Kilometers per hour"),
        ("mph", "Miles per hour"),
    }

    field = models.CharField(max_length=1, choices=FIELD_TYPES, blank=True)
    unit = models.CharField(max_length=3, choices=FIELD_UNITS, blank=True)
    value = models.DecimalField(max_digits=5, decimal_places=1, default=0.0, blank=True)

    def __str__(self):
        if str(self.value) > 0:
            return str(self.value) + " " + self.unit
        return ""
