import React, { useState } from "react";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface ShoppingCartProps {
  items?: CartItem[];
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
  onCheckout?: () => void;
}

const ShoppingCart = ({
  items = [
    {
      id: "1",
      name: "Anillo de Oro 18k",
      price: 1299.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&q=80",
    },
    {
      id: "2",
      name: "Reloj Elegante Clásico",
      price: 2499.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&q=80",
    },
    {
      id: "3",
      name: "Collar de Plata",
      price: 899.99,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&q=80",
    },
  ],
  onUpdateQuantity = () => {},
  onRemoveItem = () => {},
  onCheckout = () => {},
}: ShoppingCartProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      onUpdateQuantity(id, newQuantity);
    }
  };

  const handleRemoveItem = (id: string) => {
    onRemoveItem(id);
  };

  const handleCheckout = () => {
    setIsOpen(false);
    onCheckout();
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="relative p-2">
          <ShoppingBag className="h-6 w-6" />
          {totalItems > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-white">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold">
            Carrito de Compras
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64">
              <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
              <p className="text-gray-500">Su carrito está vacío</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setIsOpen(false)}
              >
                Continuar Comprando
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-grow overflow-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex py-4 border-b">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div className="flex justify-between text-base font-medium">
                        <h3 className="text-sm">{item.name}</h3>
                        <button
                          type="button"
                          className="text-gray-400 hover:text-gray-500"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        ${item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center mt-2">
                        <button
                          className="rounded-md border p-1"
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="mx-2 text-sm">{item.quantity}</span>
                        <button
                          className="rounded-md border p-1"
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                        <div className="ml-auto text-sm font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 py-4 mt-auto">
                <div className="flex justify-between text-base font-medium">
                  <p>Subtotal</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Envío e impuestos calculados al finalizar la compra.
                </p>
                <div className="mt-4">
                  <Button className="w-full" onClick={handleCheckout}>
                    Finalizar Compra
                  </Button>
                </div>
                <div className="mt-2 flex justify-center text-center text-sm text-gray-500">
                  <button
                    type="button"
                    className="font-medium text-primary hover:text-primary/80"
                    onClick={() => setIsOpen(false)}
                  >
                    Continuar Comprando
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCart;
