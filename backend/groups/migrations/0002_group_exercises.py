# Generated by Django 4.2 on 2023-04-15 21:09

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("exercises", "0002_remove_exercise_type_exercise_records_exercise_sets"),
        ("groups", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="group",
            name="exercises",
            field=models.ManyToManyField(blank=True, to="exercises.exercise"),
        ),
    ]
