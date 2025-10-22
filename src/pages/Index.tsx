import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QrCode, Clock, ShoppingBag, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import CartSheet from "@/components/CartSheet";
import { toast } from "sonner";
import heroImage from "@/assets/hero-restaurant.jpg";
import burgerImage from "@/assets/product-burger.jpg";
import pizzaImage from "@/assets/product-pizza.jpg";
import pastaImage from "@/assets/product-pasta.jpg";
import saladImage from "@/assets/product-salad.jpg";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const mockProducts = [
  {
    id: 1,
    name: "Burger Clássico",
    description: "Hambúrguer artesanal com queijo cheddar, alface e molho especial",
    price: 32.90,
    image: burgerImage,
    category: "Lanches",
  },
  {
    id: 2,
    name: "Pizza Margherita",
    description: "Molho de tomate, mozzarella fresca, manjericão e azeite",
    price: 45.00,
    image: pizzaImage,
    category: "Pizzas",
  },
  {
    id: 3,
    name: "Pasta Carbonara",
    description: "Massa italiana com bacon, ovos, parmesão e pimenta preta",
    price: 38.50,
    image: pastaImage,
    category: "Massas",
  },
  {
    id: 4,
    name: "Salada Caesar",
    description: "Alface romana, croutons, parmesão e molho caesar",
    price: 28.00,
    image: saladImage,
    category: "Saladas",
  },
];

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (product: any) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        { ...product, quantity: 1 },
      ]);
    }

    toast.success(`${product.name} adicionado ao carrinho!`);
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    toast.info("Item removido do carrinho");
  };

  const handleCheckout = () => {
    toast.success("Pedido realizado com sucesso!");
    setCartItems([]);
    setIsCartOpen(false);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        cartItemsCount={totalItems}
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* Hero Section */}
      <section id="home" className="relative gradient-hero overflow-hidden">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="secondary" className="w-fit">
                Sistema Digital de Pedidos
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground">
                Cardápio Digital
                <span className="block text-primary">Moderno e Prático</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Acesse nosso cardápio via QR Code, faça pedidos direto do seu celular
                e acompanhe o status em tempo real. Experiência única e sem espera!
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="hero" size="xl" onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}>
                  <QrCode className="h-5 w-5" />
                  Ver Cardápio
                </Button>
                <Button variant="outline" size="xl">
                  Saiba Mais
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src={heroImage}
                alt="Pratos deliciosos"
                className="rounded-2xl shadow-hover w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Como Funciona
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Processo simples e rápido para fazer seu pedido
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto shadow-glow">
                <QrCode className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-lg">1. Escaneie o QR Code</h3>
              <p className="text-sm text-muted-foreground">
                Acesse o cardápio digital direto do seu celular
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto shadow-glow">
                <ShoppingBag className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-lg">2. Escolha os Itens</h3>
              <p className="text-sm text-muted-foreground">
                Navegue pelo cardápio e adicione ao carrinho
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto shadow-glow">
                <CheckCircle2 className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-lg">3. Finalize o Pedido</h3>
              <p className="text-sm text-muted-foreground">
                Confirme e envie diretamente para a cozinha
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto shadow-glow">
                <Clock className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-lg">4. Acompanhe o Status</h3>
              <p className="text-sm text-muted-foreground">
                Receba notificações do preparo até a entrega
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nosso Cardápio
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore nossas deliciosas opções preparadas com ingredientes frescos
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full md:w-auto mx-auto grid grid-cols-5 mb-8">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="lanches">Lanches</TabsTrigger>
              <TabsTrigger value="pizzas">Pizzas</TabsTrigger>
              <TabsTrigger value="massas">Massas</TabsTrigger>
              <TabsTrigger value="saladas">Saladas</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-8">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {mockProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="lanches">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {mockProducts
                  .filter((p) => p.category === "Lanches")
                  .map((product) => (
                    <ProductCard
                      key={product.id}
                      {...product}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="pizzas">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {mockProducts
                  .filter((p) => p.category === "Pizzas")
                  .map((product) => (
                    <ProductCard
                      key={product.id}
                      {...product}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="massas">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {mockProducts
                  .filter((p) => p.category === "Massas")
                  .map((product) => (
                    <ProductCard
                      key={product.id}
                      {...product}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="saladas">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {mockProducts
                  .filter((p) => p.category === "Saladas")
                  .map((product) => (
                    <ProductCard
                      key={product.id}
                      {...product}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Sobre o Sistema
            </h2>
            <p className="text-lg text-muted-foreground">
              Desenvolvemos uma solução moderna para restaurantes que desejam otimizar
              o atendimento e proporcionar uma experiência única aos clientes. Com nosso
              sistema de cardápio digital, os pedidos são realizados de forma rápida,
              reduzindo erros e melhorando a comunicação entre salão e cozinha.
            </p>
            <div className="pt-4">
              <Button variant="hero" size="lg">
                Entre em Contato
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Cart Sheet */}
      <CartSheet
        open={isCartOpen}
        onOpenChange={setIsCartOpen}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default Index;
