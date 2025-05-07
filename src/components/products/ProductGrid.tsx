import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Heart, Search } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  category: "joyas" | "relojes";
  image: string;
  description?: string;
}

interface ProductGridProps {
  products?: Product[];
  onAddToCart?: (product: Product) => void;
}

const ProductGrid = ({
  products = defaultProducts,
  onAddToCart = () => {},
}: ProductGridProps) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <div className="w-full bg-white p-4 md:p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          Nuestros Productos
        </h2>

        <Tabs
          defaultValue="all"
          className="w-full"
          onValueChange={setActiveCategory}
        >
          <div className="flex justify-center mb-6">
            <TabsList>
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="joyas">Joyas</TabsTrigger>
              <TabsTrigger value="relojes">Relojes</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0">
            <ProductGridLayout
              products={filteredProducts}
              onAddToCart={onAddToCart}
            />
          </TabsContent>

          <TabsContent value="joyas" className="mt-0">
            <ProductGridLayout
              products={filteredProducts}
              onAddToCart={onAddToCart}
            />
          </TabsContent>

          <TabsContent value="relojes" className="mt-0">
            <ProductGridLayout
              products={filteredProducts}
              onAddToCart={onAddToCart}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const ProductGridLayout = ({
  products,
  onAddToCart,
}: {
  products: Product[];
  onAddToCart: (product: Product) => void;
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

const ProductCard = ({
  product,
  onAddToCart,
}: {
  product: Product;
  onAddToCart: (product: Product) => void;
}) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative overflow-hidden group">
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="capitalize">
            {product.category}
          </Badge>
        </div>
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <Button size="icon" variant="secondary" className="rounded-full">
            <Search className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="secondary" className="rounded-full">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-medium text-lg mb-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-xl font-bold mb-3">
          ${product.price.toLocaleString()}
        </p>
        <Button className="w-full" onClick={() => onAddToCart(product)}>
          <ShoppingCart className="mr-2 h-4 w-4" /> Añadir al carrito
        </Button>
      </CardContent>
    </Card>
  );
};

// Default mock products
const defaultProducts: Product[] = [
  {
    id: "1",
    name: "Anillo de Diamantes",
    price: 1299.99,
    category: "joyas",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80",
    description: "Elegante anillo de diamantes con oro blanco de 18k",
  },
  {
    id: "2",
    name: "Reloj Automático Clásico",
    price: 2499.99,
    category: "relojes",
    image:
      "https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=800&q=80",
    description: "Reloj automático con correa de cuero genuino",
  },
  {
    id: "3",
    name: "Collar de Perlas",
    price: 899.99,
    category: "joyas",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
    description: "Collar de perlas cultivadas con broche de oro",
  },
  {
    id: "4",
    name: "Reloj Cronógrafo",
    price: 3299.99,
    category: "relojes",
    image:
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800&q=80",
    description: "Cronógrafo de acero inoxidable resistente al agua",
  },
  {
    id: "5",
    name: "Pulsera de Oro",
    price: 1599.99,
    category: "joyas",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
    description: "Pulsera de oro amarillo de 18k con diseño trenzado",
  },
  {
    id: "6",
    name: "Reloj Inteligente",
    price: 1899.99,
    category: "relojes",
    image:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80",
    description:
      "Reloj inteligente con múltiples funciones y correa intercambiable",
  },
  {
    id: "7",
    name: "Pendientes de Zafiro",
    price: 2199.99,
    category: "joyas",
    image:
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80",
    description: "Elegantes pendientes con zafiros y diamantes",
  },
  {
    id: "8",
    name: "Reloj de Lujo",
    price: 4999.99,
    category: "relojes",
    image:
      "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&q=80",
    description: "Reloj de lujo con movimiento suizo y caja de oro rosa",
  },
];

export default ProductGrid;
