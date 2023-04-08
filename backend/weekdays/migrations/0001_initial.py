# Generated by Django 4.2 on 2023-04-08 13:20

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("groups", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Weekday",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "day",
                    models.CharField(
                        choices=[
                            ("mon", "Monday"),
                            ("tue", "Tuesday"),
                            ("wed", "Wednesday"),
                            ("thu", "Thursday"),
                            ("fri", "Friday"),
                            ("sat", "Saturday"),
                            ("sun", "Sunday"),
                        ],
                        max_length=3,
                        unique=True,
                    ),
                ),
                (
                    "groups",
                    models.ManyToManyField(related_name="weekdays", to="groups.group"),
                ),
            ],
        ),
    ]
