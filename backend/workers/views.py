from rest_framework import viewsets
from rest_framework.response import Response

from .models import Worker
from .serializers import WorkerSerializer


class WorkersView(viewsets.ModelViewSet):
    serializer_class = WorkerSerializer
    queryset = Worker.objects.all()
