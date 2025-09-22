# marketplace/serializers.py
from rest_framework import serializers
from .models import Post, SellingPost

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'description', 'price', 'created_at']


class SellingPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = SellingPost
        fields = [
            'id',
            'user',
            'item_name',
            'item_category',
            'price',
            'description',
            'image',
            'created_at',
        ]
        read_only_fields = ['user']  
