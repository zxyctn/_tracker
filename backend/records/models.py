from django.db import models

from sets.models import Set


class Record(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    set = models.ForeignKey(Set, on_delete=models.CASCADE, related_name="records")
