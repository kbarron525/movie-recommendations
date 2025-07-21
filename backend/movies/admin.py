from django.contrib import admin
from .models import Movie


@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ('title', 'genre', 'rating', 'created_by', 'created_at')
    list_filter = ('genre', 'rating', 'created_at')
    search_fields = ('title', 'review', 'created_by__username')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        (None, {
            'fields': ('title', 'genre', 'release_year', 'rating', 'review')
        }),
        ('Metadata', {
            'fields': ('created_by', 'created_at', 'updated_at')
        }),
    )