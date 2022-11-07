from rest_framework.serializers import ModelSerializer
from .models import ClientProject


class ProjectSerializer(ModelSerializer):

    class Meta:
        model = ClientProject
        fields = ['title', 'project_description',
                  'technologies_to_used', 'is_completed', 'is_public', 'project_owner', 'date_created', 'file', 'url']
        read_only_fields = ['project_owner']

