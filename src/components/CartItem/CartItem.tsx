import { Box, Text, Button, Stack } from "@chakra-ui/react";
import type { Extra, Pizza } from "../../data/pizzas";
import classes from './CartItem.module.css';

interface CartItemProps {
    pizza: Pizza;
    extras: Extra[];
    onRemove?: () => void;
}

export const CartItem = ({ pizza, extras, onRemove }: CartItemProps) => {
    const totalPrice = pizza.price + extras.reduce((sum, e) => sum + e.price, 0);
    return (
        <Box className={classes.card}>
            <Stack className={classes.item}>

                <Text fontWeight="bold">{pizza.namePizza}</Text>
                {extras.length > 0 && (
                    <Text fontSize="sm"><span>Добавки: </span>{extras.map((e) => e.nameIngredient).join(", ")}</Text>
                )
                }
                <Text>Цена: {totalPrice} руб.</Text>
                {onRemove && (
                    <Button onClick={onRemove}>
                        Удалить
                    </Button>
                )}
            </Stack>
        </Box>
    );
};