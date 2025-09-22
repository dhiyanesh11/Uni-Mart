from rest_framework import viewsets, permissions
from .models import SellingPost, Post
from .serializers import SellingPostSerializer, PostSerializer

class SellingPostViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for viewing, creating, and editing selling posts.
    """
    queryset = SellingPost.objects.all()
    serializer_class = SellingPostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        """
        Save the authenticated user to the selling post.
        """
        serializer.save(user=self.request.user)


class PostViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for viewing, creating, and editing posts.
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]