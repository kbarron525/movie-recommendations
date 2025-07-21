from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Movie


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the User model.
    """
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class MovieSerializer(serializers.ModelSerializer):
    """
    Serializer for the Movie model.
    """
    created_by = UserSerializer(read_only=True)
    
    class Meta:
        model = Movie
        fields = [
            'id', 'title', 'genre', 'release_year', 'rating', 
            'review', 'created_by', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_by', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        """
        Create a new movie instance.
        """
        # Get the user from the request
        user = self.context['request'].user
        movie = Movie.objects.create(created_by=user, **validated_data)
        return movie


class UserRegistrationSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration.
    """
    password = serializers.CharField(write_only=True)
    password_confirm = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password_confirm']
    
    def validate(self, data):
        """
        Validate that the passwords match.
        """
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError("Passwords do not match.")
        return data
    
    def create(self, validated_data):
        """
        Create a new user instance.
        """
        validated_data.pop('password_confirm')
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user