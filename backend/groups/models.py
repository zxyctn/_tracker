from django.db import models


class Group(models.Model):
    name = models.CharField(max_length=100)
    exercises = models.ManyToManyField(
        "exercises.Exercise", blank=True, related_name="groups"
    )

    def __str__(self):
        return self.name
