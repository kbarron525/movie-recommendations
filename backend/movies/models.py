from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator


class Movie(models.Model):
    """
    Movie model for storing movie information.
    """
    GENRE_CHOICES = [
        ('ACTION', 'Action'),
        ('COMEDY', 'Comedy'),
        ('DRAMA', 'Drama'),
        ('FANTASY', 'Fantasy'),
        ('HORROR', 'Horror'),
        ('MYSTERY', 'Mystery'),
        ('ROMANCE', 'Romance'),
        ('THRILLER', 'Thriller'),
        ('SCI_FI', 'Science Fiction'),
        ('DOCUMENTARY', 'Documentary'),
        ('ANIMATION', 'Animation'),
        ('OTHER', 'Other'),
    ]
    
    title = models.CharField(max_length=255)
    genre = models.CharField(max_length=20, choices=GENRE_CHOICES, default='OTHER')
    release_year = models.IntegerField(null=True, blank=True)
    rating = models.DecimalField(
        max_digits=3, 
        decimal_places=1,
        validators=[MinValueValidator(0), MaxValueValidator(10)],
        help_text="Rating from 0 to 10"
    )
    review = models.TextField(blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='movies')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title