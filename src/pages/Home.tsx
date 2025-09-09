import { SimpleGrid, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import type { Pizza, Extra } from "../data/pizzas";
import { pizzas } from "../data/pizzas";
import { PizzaCard } from "../components/PizzaCard/PizzaCard";
import { PizzaDrawer } from "../components/PizzaModal/PizzaModal";
import { CartStepper } from "../components/CartStepper/CartStepper";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Toaster } from "../components/ui/toaster";

export const Home = () => {
    const { open, onOpen, onClose } = useDisclosure();
    const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null);
    const [cart, setCart] = useLocalStorage<{ pizza: Pizza; extras: Extra[] }[]>(
        "cart",
        []
    );

    const handleAdd = (pizza: Pizza) => {
        setSelectedPizza(pizza);
        onOpen();
    };

    const handleConfirmExtras = (extras: Extra[]) => {
        if (selectedPizza) {
            setCart([...cart, { pizza: selectedPizza, extras }]);
        }
        onClose();
    };

    return (
        <>
            <SimpleGrid columns={[1, 2, 3]} p={4} gap={10}>
                {pizzas.map((pizza) => (
                    <PizzaCard key={pizza.id} pizza={pizza} onAdd={handleAdd} />
                ))}
            </SimpleGrid>

            <PizzaDrawer
                pizza={selectedPizza}
                open={open}
                onClose={onClose}
                onConfirm={handleConfirmExtras}
            />

            <CartStepper
                items={cart}
                onRemoveItem={(index) => {
                    setCart(prev => prev.filter((_, i) => i !== index));
                }}
            />

            <Toaster />
        </>
    );
};
