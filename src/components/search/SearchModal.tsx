import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: "joyas" | "relojes";
}

interface SearchModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const SearchModal = ({
  isOpen = false,
  onClose = () => {},
}: SearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  // Mock products data
  const mockProducts: Product[] = [
    {
      id: "1",
      name: "Anillo de Diamantes",
      price: 1299.99,
      image:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&q=80",
      category: "joyas",
    },
    {
      id: "2",
      name: "Collar de Perlas",
      price: 899.99,
      image:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&q=80",
      category: "joyas",
    },
    {
      id: "3",
      name: "Reloj Automático",
      price: 2499.99,
      image:
        "https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=300&q=80",
      category: "relojes",
    },
    {
      id: "4",
      name: "Reloj Cronógrafo",
      price: 1899.99,
      image:
        "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=300&q=80",
      category: "relojes",
    },
    {
      id: "5",
      name: "Pulsera de Oro",
      price: 799.99,
      image:
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&q=80",
      category: "joyas",
    },
  ];

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter products based on search query
    if (query.trim() === "") {
      setSearchResults([]);
    } else {
      const filteredResults = mockProducts.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase()),
      );
      setSearchResults(filteredResults);
    }
  };

  // Handle product click
  const handleProductClick = (productId: string) => {
    // In a real app, this would navigate to the product detail page
    console.log(`Navigate to product ${productId}`);
    onClose();
  };

  // Format price to currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            Buscar Productos
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center space-x-2 mb-4">
          <Input
            type="text"
            placeholder="Buscar joyas, relojes..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="flex-1"
          />
          <Button variant="outline">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <div className="max-h-[300px] overflow-y-auto">
          {searchResults.length > 0 ? (
            <div className="space-y-4">
              {searchResults.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center space-x-4 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                  onClick={() => handleProductClick(product.id)}
                >
                  <div className="h-16 w-16 overflow-hidden rounded-md">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-gray-500">
                      {product.category === "joyas" ? "Joyería" : "Relojería"}
                    </p>
                  </div>
                  <div className="font-semibold">
                    {formatPrice(product.price)}
                  </div>
                </div>
              ))}
            </div>
          ) : searchQuery ? (
            <p className="text-center text-gray-500 py-8">
              No se encontraron resultados para "{searchQuery}"
            </p>
          ) : (
            <p className="text-center text-gray-500 py-8">
              Ingresa un término de búsqueda para ver resultados
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
