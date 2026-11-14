from django.core.management.base import BaseCommand

from catalogue.models import Category, Product

DATA = {
    "Informatique": [
        ("Ordinateur portable 14\"", "Core i5, 16 Go RAM, 512 Go SSD", "749.00", 24, "TechPro"),
        ("Ecran 27\" QHD", "Dalle IPS, 75 Hz, reglable en hauteur", "189.00", 40, "TechPro"),
        ("Clavier mecanique", "Clavier AZERTY retroeclaire", "59.90", 120, "Bureautik"),
    ],
    "Mobilier de bureau": [
        ("Chaise ergonomique", "Soutien lombaire, accoudoirs reglables", "159.00", 35, "Mobilier Plus"),
        ("Bureau assis-debout", "Plateau 140x70, reglage electrique", "329.00", 18, "Mobilier Plus"),
    ],
    "Fournitures": [
        ("Ramette papier A4", "500 feuilles, 80 g/m2", "4.50", 500, "Bureautik"),
        ("Lot de stylos", "Boite de 50 stylos bille bleus", "12.00", 200, "Bureautik"),
    ],
}


class Command(BaseCommand):
    help = "Remplit le catalogue avec des donnees d'exemple (idempotent)."

    def handle(self, *args, **options):
        created = 0
        for category_name, products in DATA.items():
            category, _ = Category.objects.get_or_create(name=category_name)
            for name, description, price, stock, supplier in products:
                _, is_new = Product.objects.get_or_create(
                    name=name,
                    defaults={
                        "description": description,
                        "price": price,
                        "stock": stock,
                        "supplier": supplier,
                        "category": category,
                    },
                )
                created += int(is_new)
        self.stdout.write(self.style.SUCCESS(f"Catalogue initialise : {created} produit(s) ajoute(s)."))
