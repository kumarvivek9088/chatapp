# Generated by Django 4.1.4 on 2023-10-05 04:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='myuser',
            name='profilepic',
            field=models.ImageField(blank=True, null=True, upload_to='profile/'),
        ),
    ]
