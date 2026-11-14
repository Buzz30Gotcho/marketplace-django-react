from django.test import TestCase
from rest_framework.test import APIClient

from .models import Category, Product


class ProductAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.category = Category.objects.create(name="Fruits")
        Product.objects.create(
            name="Pomme",
            description="Pomme Gala",
            price="1.50",
            stock=10,
            supplier="Primeur Local",
            category=self.category,
        )

    def test_list_products(self):
        response = self.client.get("/api/products/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["count"], 1)

    def test_search_filters_results(self):
        found = self.client.get("/api/products/?search=Pomme")
        self.assertEqual(len(found.json()["results"]), 1)

        empty = self.client.get("/api/products/?search=inexistant")
        self.assertEqual(len(empty.json()["results"]), 0)

    def test_create_requires_authentication(self):
        response = self.client.post("/api/products/", {"name": "Banane"})
        self.assertEqual(response.status_code, 403)
