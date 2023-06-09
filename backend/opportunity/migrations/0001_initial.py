# Generated by Django 4.0.5 on 2023-03-05 22:38

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('company', '0001_initial'),
        ('app', '0002_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Opportunity',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('job_title', models.CharField(max_length=255)),
                ('job_description', models.TextField(max_length=255)),
                ('job_skills', models.TextField()),
                ('date_posted', models.DateTimeField(auto_now_add=True)),
                ('isApproved', models.CharField(choices=[('True', 'Approved'), ('False', 'Not Approved')], default=False, max_length=256)),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='job_company', to='company.companyprofile')),
            ],
        ),
        migrations.CreateModel(
            name='OpportunityTags',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('tagName', models.CharField(max_length=255)),
                ('opportunity', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='opportunity_tags', to='opportunity.opportunity')),
            ],
        ),
        migrations.CreateModel(
            name='OpportunityApplication',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('details', models.TextField(default='Hello, I want to apply for this job.')),
                ('date_applied', models.DateTimeField(auto_now_add=True)),
                ('applicant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='job_posting_applicant', to='app.regularuser')),
                ('opportunity', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='opportunity', to='opportunity.opportunity')),
            ],
        ),
    ]
