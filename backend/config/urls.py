
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from catalogue.views import CategoryViewSet, ProductViewSet

router = DefaultRouter()
router.register("categories", CategoryViewSet)
router.register("products", ProductViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
]