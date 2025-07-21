from rest_framework import viewsets, permissions, status, generics
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth.models import User
from .models import Movie
from .serializers import MovieSerializer, UserSerializer, UserRegistrationSerializer


class MovieViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing and editing movie instances.
    """
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        """
        Return all movies.
        """
        return Movie.objects.all().order_by('-created_at')
    
    @action(detail=False, methods=['get'])
    def my_movies(self, request):
        """
        Return movies created by the current user.
        """
        movies = Movie.objects.filter(created_by=request.user).order_by('-created_at')
        serializer = self.get_serializer(movies, many=True)
        return Response(serializer.data)


class UserRegistrationView(generics.CreateAPIView):
    """
    View for user registration.
    """
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # Return user data without password
        user_serializer = UserSerializer(user)
        return Response(
            user_serializer.data,
            status=status.HTTP_201_CREATED
        )


class UserProfileView(generics.RetrieveAPIView):
    """
    View for retrieving user profile.
    """
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        return self.request.user