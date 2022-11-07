from django.shortcuts import render
from django.http import HttpResponse
from authentication.models import Coordinator, ProjectOwner
from .serializers import ProjectSerializer
from .models import ClientProject
from rest_framework import response, status, permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import CreateAPIView, ListAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.decorators import api_view

class RecordProjectApiView(CreateAPIView):

    serializer_class = ProjectSerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        project_owner2 = ProjectOwner.objects.get(
            project_owner=self.request.user.id)
        if project_owner2:
            if serializer.is_valid():
                serializer.save(project_owner=project_owner2)
                return response.Response({"project": "Project recorded successfully"}, status=status.HTTP_201_CREATED)
            return response.Response({"error": "Wrong inputs"}, status=status.HTTP_400_BAD_REQUEST)
        return response.Response({"error": "User role should be a project owner"}, status=status.HTTP_400_BAD_REQUEST)


# View to list all public pending projects


class Public_Pending_ProjectListApiView(ListAPIView):
    serializer_class = ProjectSerializer

    def get_queryset(self):
        return ClientProject.objects.filter(is_completed=False).filter(is_public=True)

# View to list all private pending projects


class Private_Pending_ProjectListApiView(ListAPIView):
    serializer_class = ProjectSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return ClientProject.objects.filter(is_completed=False).filter(is_public=False)


# View to list all public completed projects
class Public_Completed_ProjectListApiView(ListAPIView):
    serializer_class = ProjectSerializer

    def get_queryset(self):
        return ClientProject.objects.filter(is_completed=True).filter(is_public=True)

# View to list all private completed projects


class Private_Completed_ProjectListApiView(ListAPIView):
    serializer_class = ProjectSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return ClientProject.objects.filter(is_completed=True).filter(is_public=False)


# View to List all the public pending projects for the current login projectOwner
class ProjectOwnerPublicPendingProjectsApiView(ListAPIView):

    serializer_class = ProjectSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user.id
        project_owner = ProjectOwner.objects.get(project_owner=user)

        return ClientProject.objects.filter(owner=project_owner).filter(is_completed=False).filter(is_public=True)


# View to List all the public completed projects for the current login projectOwner
class ProjectOwnerPublicCompletedProjectsApiView(ListAPIView):

    serializer_class = ProjectSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user.id
        project_owner = ProjectOwner.objects.get(project_owner=user)

        return ClientProject.objects.filter(owner=project_owner).filter(is_completed=True).filter(is_public=True)


# View to List all the private pending projects for the current login projectOwner

class ProjectOwnerPrivatePendingProjectsApiView(ListAPIView):

    serializer_class = ProjectSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user.id
        project_owner = ProjectOwner.objects.get(project_owner=user)

        return ClientProject.objects.filter(owner=project_owner).filter(is_completed=False).filter(is_public=False)


# View to List all the private completed projects for the current login projectOwner

class ProjectOwnerPrivateCompletedProjectsApiView(ListAPIView):

    serializer_class = ProjectSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user.id
        project_owner = ProjectOwner.objects.get(project_owner=user)

        return ClientProject.objects.filter(owner=project_owner).filter(is_completed=True).filter(is_public=False)


# View to List all the private  projects for the current login projectOwner

class ProjectOwnerPrivateProjectsApiView(ListAPIView):

    serializer_class = ProjectSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user.id
        project_owner = ProjectOwner.objects.get(project_owner=user)

        return ClientProject.objects.filter(owner=project_owner).filter(is_public=False)

# View to List all the public projects for the current login projectOwner


class ProjectOwnerPublicProjectsApiView(ListAPIView):

    serializer_class = ProjectSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user.id
        project_owner = ProjectOwner.objects.get(project_owner=user)

        return ClientProject.objects.filter(owner=project_owner).filter(is_public=True)


# View to List all the completed projects for the current login projectOwner

class ProjectOwnerCompletedProjectsApiView(ListAPIView):

    serializer_class = ProjectSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user.id
        project_owner = ProjectOwner.objects.get(project_owner=user)

        return ClientProject.objects.filter(owner=project_owner).filter(is_completed=True)


# View to List all the pending projects for the current login projectOwner

class ProjectOwnerPendingProjectsApiView(ListAPIView):

    serializer_class = ProjectSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user.id
        project_owner = ProjectOwner.objects.get(project_owner=user)

        return ClientProject.objects.filter(owner=project_owner).filter(is_completed=False)

# View to List the project detail


# class ProjectDetailApiView(RetrieveUpdateDestroyAPIView):

#     serializer_class = ProjectSerializer
#     # permission_classes = (IsAuthenticated,)
    
#     def get_queryset(self):
#         lookup_field = 'id'
#         print("$$$$$$$$$$$$$$$$$$$$$")
#         print(lookup_field)
#         return ClientProject.objects.get(id=lookup_field)



@api_view(['GET'])
def project_detail(request, pk):
    try:
        if request.method == 'GET':
       
            projects = ClientProject.objects.get(id=pk)
            serializer = ProjectSerializer(projects, many=False)
            return response.Response(serializer.data)
    except ClientProject.DoesNotExist:
        return response.Response(status=status.HTTP_404_NOT_FOUND)


