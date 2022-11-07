from enum import unique
from authentication.models import *


STATUS_CHOICES = (
    ('pending', 'pending'),
    ('completed', 'completed'),
    ('cancelled', 'cancelled'),
)


class ClientProject(models.Model):

    project_owner = models.ForeignKey(ProjectOwner, on_delete=models.CASCADE)
    # coodinator = models.ForeignKey(
    #     Coordinator, on_delete=models.CASCADE, null=True)
    # reviewer = models.ForeignKey(Reviewer, on_delete=models.CASCADE, null=True)
    # manager = models.ForeignKey(Manager, on_delete=models.CASCADE, null=True)
    # implementer = models.ForeignKey(
    #     Implementer, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=255)
    project_description = models.TextField(max_length=255)
    url = models.TextField(max_length=255)
    # status = models.CharField(
    #     max_length=255, choices=STATUS_CHOICES, default='pending')
    title = models.TextField()
    technologies_to_used = models.TextField()
    is_completed = models.BooleanField(default=False)
    is_public = models.BooleanField(default=True)
    date_created = models.DateTimeField(('date created'), default=timezone.now)
    file = models.FileField(blank=True, null=True)

    def __str__(self):
        return self.title
