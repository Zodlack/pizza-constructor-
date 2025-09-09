import { Card, Image, Text, Button, Stack } from "@chakra-ui/react";
import type { Pizza } from "../../data/pizzas";
import classes from './PizzaCard.module.css';

export interface PizzaCardProps {
    pizza: Pizza;
    onAdd: (pizza: Pizza) => void;
}

export const PizzaCard = ({ pizza, onAdd }: PizzaCardProps) => {
    return (
        <Card.Root className={classes.card}>
            <Image src={pizza.image} alt={pizza.namePizza}/>
            <Stack>
                <Text>{pizza.namePizza}</Text>
                <Text>Цена: {pizza.price} руб.</Text>
                
                <Button onClick={() => onAdd(pizza)}>
                    Добавить в корзину
                </Button>
            </Stack>
        </Card.Root>
    )
}