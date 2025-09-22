from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SellingPostViewSet, PostViewSet

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'selling_posts', SellingPostViewSet, basename='sellingpost')
router.register(r'posts', PostViewSet, basename='post')

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
]
