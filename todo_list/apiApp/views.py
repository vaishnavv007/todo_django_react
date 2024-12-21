from django.shortcuts import render
from django.contrib.auth.hashers import make_password,check_password

from apiApp.models import user_cred,todo_data

from rest_framework.decorators import api_view
from rest_framework.response import Response
# Create your views here.

@api_view(['POST'])
def login(request,format=None):
    username = request.data['username']
    password = request.data['password']
    try:
        user_get = user_cred.objects.get(username = username)
    except:
        return Response({'message':'user does not exit'})   
    if (check_password(password,user_get.password)):     
         return Response({
                         'message':'successfully logined',
                        })
    else:
        return Response({
                         'message':'wrong credentials',
                        })     

@api_view(['POST'])
def create_todo(request,format=None):
    title_input = request.data['title']
    desc_input = request.data['desc']
    status_input = 'in progress' 

    obj = todo_data(
                    title = title_input,
                    desc = desc_input,
                    status = status_input
                   ) 
    obj.save()
    return Response({
        'message':'todo created successfully'
    })

@api_view(['GET'])
def intial_call(request,format=None):
    all = todo_data.objects.all().values().count()  
    completed = todo_data.objects.filter(status = 'completed').values().count()
    in_progress = todo_data.objects.filter(status = 'in progress').values().count()
    archived = todo_data.objects.filter(status = 'archived').values().count()
    stat = [
        {"label": "All",
         "value": all},
         {"label": "Completed",
         "value": completed},
         {"label": "In Progress",
         "value": in_progress},
         {"label": "Archived",
         "value": archived},
    ]
    todo = todo_data.objects.exclude(status = 'archived').all().values('id','title','desc','status')
    return Response({
        'message':'successfully',
        'stats':stat,
        'todo_data':todo,})


@api_view(['GET'])
def completed(request,format=None):
    obj = todo_data.objects.filter(status = 'completed').values('id','title','desc','status')
    return Response({'message':'successfully',
        'todo_data':obj,})

@api_view(['GET'])
def in_progress(request,format=None):
    obj = todo_data.objects.filter(status = 'in progress').values('id','title','desc','status')
    return Response({'message':'successfully',
        'todo_data':obj,})

@api_view(['GET'])
def archived(request,format=None):
    obj = todo_data.objects.filter(status = 'archived').values('id','title','desc','status')
    return Response({'message':'successfully',
        'todo_data':obj,})

@api_view(['POST'])
def complete_task(request,format=None):
    task_id = request.data['id']
    obj = todo_data.objects.filter(id = task_id).update(status = 'completed')
    all = todo_data.objects.all().values().count()  
    completed = todo_data.objects.filter(status = 'completed').values().count()
    in_progress = todo_data.objects.filter(status = 'in progress').values().count()
    archived = todo_data.objects.filter(status = 'archived').values().count()
    stat = [
        {"label": "All",
         "value": all},
         {"label": "Completed",
         "value": completed},
         {"label": "In Progress",
         "value": in_progress},
         {"label": "Archived",
         "value": archived},
    ]
    todo = todo_data.objects.exclude(status = 'archived').all().values('id','title','desc','status')
    return Response({
        'message':'successfully',
        'stats':stat,
        'todo_data':todo,})

@api_view(['POST'])
def archived_task(request,format=None):
    task_id = request.data['id']
    obj = todo_data.objects.filter(id = task_id).update(status = 'archived')
    all = todo_data.objects.all().values().count()  
    completed = todo_data.objects.filter(status = 'completed').values().count()
    in_progress = todo_data.objects.filter(status = 'in progress').values().count()
    archived = todo_data.objects.filter(status = 'archived').values().count()
    stat = [
        {"label": "All",
         "value": all},
         {"label": "Completed",
         "value": completed},
         {"label": "In Progress",
         "value": in_progress},
         {"label": "Archived",
         "value": archived},
    ]
    todo = todo_data.objects.exclude(status = 'archived').all().values('id','title','desc','status')
    return Response({
        'message':'successfully',
        'stats':stat,
        'todo_data':todo,})

@api_view(['DELETE'])
def delete_task(request,format=None):
    task_id = request.data['id']
    obj = todo_data.objects.filter(id = task_id).delete()

    all = todo_data.objects.all().values().count()  
    completed = todo_data.objects.filter(status = 'completed').values().count()
    in_progress = todo_data.objects.filter(status = 'in progress').values().count()
    archived = todo_data.objects.filter(status = 'archived').values().count()
    stat = [
        {"label": "All",
         "value": all},
         {"label": "Completed",
         "value": completed},
         {"label": "In Progress",
         "value": in_progress},
         {"label": "Archived",
         "value": archived},
    ]
    todo = todo_data.objects.exclude(status = 'archived').all().values('id','title','desc','status')
    return Response({
        'message':'successfully',
        'stats':stat,
        'todo_data':todo,})

@api_view(['PUT'])
def update_task(request,format=None):
    task_id = request.data['id']
    task_title = request.data['title']
    task_desc = request.data['desc']
    obj = todo_data.objects.filter(id = task_id).update(title = task_title,desc = task_desc)

    all = todo_data.objects.all().values().count()  
    completed = todo_data.objects.filter(status = 'completed').values().count()
    in_progress = todo_data.objects.filter(status = 'in progress').values().count()
    archived = todo_data.objects.filter(status = 'archived').values().count()
    stat = [
        {"label": "All",
         "value": all},
         {"label": "Completed",
         "value": completed},
         {"label": "In Progress",
         "value": in_progress},
         {"label": "Archived",
         "value": archived},
    ]
    todo = todo_data.objects.exclude(status = 'archived').all().values('id','title','desc','status')
    return Response({
        'message':'successfully',
        'stats':stat,
        'todo_data':todo,})

#@api_view(['POST'])
#def create_user(request,format=None):
#    user = request.data['username']
#    password = request.data['password']
#    enc_pass = make_password(password)
#    obj = user_cred(
#        username = user,
#        password = enc_pass
#    )
#    obj.save()
#    return Response({'message':'user created'})