from django.urls import path
from project import views

urlpatterns = [

    # project urls
    path('record_project', views.RecordProjectApiView.as_view(),
         name="record_project"),
    path('public_pending_projects', views.Public_Pending_ProjectListApiView.as_view(),
         name="public_pending_projects"),

    path('private_pending_projects', views.Private_Pending_ProjectListApiView.as_view(),
         name="private_pending_projects"),

    path('public_completed_projects', views.Public_Completed_ProjectListApiView.as_view(),
         name="public_completed_projects"),

    path('private_completed_projects', views.Private_Completed_ProjectListApiView.as_view(),
         name="private_completed_projects"),


    # Projects for logged in projectOwner
    path('personal_public_pending_projects',
         views.ProjectOwnerPublicPendingProjectsApiView.as_view(), name="personal_public_pending_projects"),

    path('personal_public_completed_projects', views.ProjectOwnerPublicCompletedProjectsApiView.as_view(
    ), name='personal_public_completed_projects'),

    path('personal_private_pending_projects', views.ProjectOwnerPrivatePendingProjectsApiView.as_view(
    ), name='personal_private_pending_projects'),

    path('personal_private_completed_projects', views.ProjectOwnerPrivateCompletedProjectsApiView.as_view(
    ), name='personal_private_completed_projects'),


    path('personal_public_projects',
         views.ProjectOwnerPublicProjectsApiView.as_view(), name="personal_public_projects"),

    path('personal_private_projects', views.ProjectOwnerPrivateProjectsApiView.as_view(
    ), name='personal_private_projects'),

    path('personal_completed_projects', views.ProjectOwnerCompletedProjectsApiView.as_view(
    ), name='personal_completed_projects'),

    path('personal_pending_projects', views.ProjectOwnerPendingProjectsApiView.as_view(
    ), name='personal_pending_projects'),
    
    
    path('project_detail/<int:pk>',
         views.project_detail, name="project_detail"),


]
