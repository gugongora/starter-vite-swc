import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "./layout/Navbar";
import ProductGrid from "./products/ProductGrid";
import ShoppingCart from "./cart/ShoppingCart";
import SearchModal from "./search/SearchModal";

const Home = () => {
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  // Featured products mock data
  const featuredProducts = [
    {
      id: 1,
      name: "Anillo de Diamantes",
      price: 1299.99,
      image:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80",
      category: "joyas",
    },
    {
      id: 2,
      name: "Reloj Automático Clásico",
      price: 2499.99,
      image:
        "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800&q=80",
      category: "relojes",
    },
    {
      id: 3,
      name: "Collar de Perlas",
      price: 899.99,
      image:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
      category: "joyas",
    },
    {
      id: 4,
      name: "Reloj Cronógrafo",
      price: 1899.99,
      image:
        "https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?w=800&q=80",
      category: "relojes",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <Navbar
        onCartClick={() => setIsCartOpen(true)}
        onSearchClick={() => setIsSearchOpen(true)}
      />

      {/* Hero Section */}
      <section className="relative">
        <div className="w-full h-[500px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1200&q=80"
            alt="Joyería Góngora"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Joyería Góngora
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl mb-8 text-center max-w-2xl px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Elegancia y distinción en cada pieza
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Explorar Colección
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Productos Destacados
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden transition-all hover:shadow-lg"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                <p className="text-muted-foreground mb-3">
                  {product.category === "joyas" ? "Joya" : "Reloj"}
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">${product.price.toFixed(2)}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Añadir
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button variant="outline" size="lg">
            Ver todos los productos
          </Button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Nuestras Categorías
          </h2>
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="joyas">Joyas</TabsTrigger>
                <TabsTrigger value="relojes">Relojes</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="all">
              <ProductGrid category="all" />
            </TabsContent>
            <TabsContent value="joyas">
              <ProductGrid category="joyas" />
            </TabsContent>
            <TabsContent value="relojes">
              <ProductGrid category="relojes" />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Sobre Joyería Góngora</h2>
            <p className="text-muted-foreground mb-4">
              Con más de 50 años de experiencia, Joyería Góngora se ha
              convertido en un referente de calidad y elegancia en el mundo de
              la joyería y relojería.
            </p>
            <p className="text-muted-foreground mb-6">
              Cada pieza que ofrecemos está cuidadosamente seleccionada para
              garantizar la más alta calidad y satisfacción de nuestros
              clientes.
            </p>
            <Button variant="outline">Conocer más</Button>
          </div>
          <div className="rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?w=800&q=80"
              alt="Joyería Góngora taller"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4">Joyería Góngora</h3>
              <p className="mb-4">
                Elegancia y distinción en cada pieza desde 1970.
              </p>
              <p>
                © {new Date().getFullYear()} Joyería Góngora. Todos los
                derechos reservados.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-4">Enlaces</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Joyas
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Relojes
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Sobre Nosotros
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-4">Contacto</h3>
              <address className="not-italic">
                <p className="mb-2">Calle Principal 123</p>
                <p className="mb-2">Ciudad, CP 12345</p>
                <p className="mb-2">Teléfono: (123) 456-7890</p>
                <p>Email: info@joyeriagongora.com</p>
              </address>
            </div>
          </div>
        </div>
      </footer>

      {/* Shopping Cart Drawer */}
      <ShoppingCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
};

export default Home;
