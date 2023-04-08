from django.db import models
from groups.models import Group


class Weekday(models.Model):
    DAYS_OF_WEEK = (
        ("mon", "Monday"),
        ("tue", "Tuesday"),
        ("wed", "Wednesday"),
        ("thu", "Thursday"),
        ("fri", "Friday"),
        ("sat", "Saturday"),
        ("sun", "Sunday"),
    )
    day = models.CharField(max_length=3, choices=DAYS_OF_WEEK, unique=True)
    groups = models.ManyToManyField(Group, related_name="weekdays")

    def __str__(self):
        return self.get_day_display()
