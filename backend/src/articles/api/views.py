from articles.models import Article
from .serializers import ArticleSerializer

from rest_framework import viewsets

# putting all generics views into one view
class ArticleViewSet(viewsets.ModelViewSet):
    serializer_class = ArticleSerializer
    queryset = Article.objects.all()


# ^^^ this code essential does everything bottom code does because of ViewSet


# from rest_framework.generics import (ListAPIView,
#                                     RetrieveAPIView,
#                                     CreateAPIView,
#                                     DestroyAPIView,
#                                     UpdateAPIView
#                                     )


# class ArticleListView(ListAPIView):
#     queryset = Article.objects.all()
#     serializer_class = ArticleSerializer
#
#
# class ArticleDetailView(RetrieveAPIView):
#     queryset = Article.objects.all()
#     serializer_class = ArticleSerializer
#
# class ArticleCreateView(CreateAPIView):
#     queryset = Article.objects.all()
#     serializer_class = ArticleSerializer
#
# class ArticleUpdateView(UpdateAPIView):
#     queryset = Article.objects.all()
#     serializer_class = ArticleSerializer
#
# class ArticleDeleteView(DestroyAPIView):
#     queryset = Article.objects.all()
#     serializer_class = ArticleSerializer
