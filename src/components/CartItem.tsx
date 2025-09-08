import { Box, Text } from "@chakra-ui/react";
import type { Extra, Pizza } from "../data/pizzas";

interface CartItemProps {
    pizza: Pizza;
    extras: Extra[];
}

export const CartItem = ({ pizza, extras }: CartItemProps) => {
    const totalPrice = pizza.price + extras.reduce((sum, e) => sum + e.price, 0);
    return (
        <Box p={2} borderWidth="1px" mb={2} borderRadius="md">
            <Text fontWeight="bold">{pizza.namePizza}</Text>
            {extras.length > 0 && (
                <Text fontSize="sm">Добавки: {extras.map((e) => e.nameIngredient).join(", ")}</Text>
            )
            }
            <Text>Цена: {totalPrice} руб.</Text>
        </Box>
    );
};