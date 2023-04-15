from django.db import models

from sets.models import Set
from records.models import Record


class Exercise(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    sets = models.ForeignKey(Set, on_delete=models.CASCADE, null=True, blank=True)
    records = models.ForeignKey(Record, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.name
