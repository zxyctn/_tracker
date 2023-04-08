from django.db import models


class Exercise(models.Model):
    TYPES = (
        ("WL", "Weight Lifting"),
        ("CRD", "Cardio"),
        ("COR", "Core"),
    )
    name = models.CharField(max_length=100)
    description = models.TextField()
    type = models.CharField(max_length=3, choices=TYPES)

    def __str__(self):
        return self.name


# class CardioExercise(Exercise):
#     SPEED_UNITS = (
#         ("km/h", "km/h"),
#         ("mph", "mph"),
#     )
#     DISTANCE_UNITS = (
#         ("km", "km"),
#         ("miles", "miles"),
#     )
#     duration = models.PositiveIntegerField(help_text="Duration in minutes")
#     speed = models.FloatField(
#         null=True, blank=True, help_text="Speed of exercise", choices=SPEED_UNITS
#     )
#     elevation = models.FloatField(
#         null=True, blank=True, help_text="Elevation gain of exercise"
#     )
#     level = models.PositiveIntegerField(
#         null=True, blank=True, help_text="Difficulty level of exercise"
#     )
#     calories = models.PositiveIntegerField(
#         null=True, blank=True, help_text="Calories burned during exercise"
#     )
#     distance = models.FloatField(
#         null=True,
#         blank=True,
#         help_text="Distance covered during exercise",
#         choices=DISTANCE_UNITS,
#     )

#     def __str__(self):
#         return self.name


# class Set(models.Model):
#     exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
#     weight = models.FloatField()
#     unit = models.CharField(max_length=10)
#     reps = models.IntegerField()

#     def __str__(self):
#         return f"Set for {self.exercise.name}"
