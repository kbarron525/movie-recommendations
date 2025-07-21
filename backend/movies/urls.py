from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MovieViewSet, UserRegistrationView, UserProfileView

# Create a router and register our viewsets with it
router = DefaultRouter()
router.register(r'', MovieViewSet)

urlpatterns = [
    # Movie endpoints
    path('', include(router.urls)),
    
    # User endpoints
    path('auth/register/', UserRegistrationView.as_view(), name='register'),
    path('auth/profile/', UserProfileView.as_view(), name='profile'),
]