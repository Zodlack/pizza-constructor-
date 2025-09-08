import{
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    // DrawerCloseTrigger,
    Button,
    Checkbox,
    CheckboxGroup,
    Stack,
} from "@chakra-ui/react";

import type { Pizza, Extra } from "../data/pizzas";
import { useState } from "react";

interface PizzaDrawerProps {
    pizza: Pizza | null;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (selectedExtras: Extra[]) => void;
}

export const PizzaDrawer = ({
    pizza,
    isOpen,
    onClose,
    onConfirm,
}: PizzaDrawerProps) => {
    const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

    if (!pizza) return null;

    const handleConfirm = () => {
        const extras = pizza.extras.filter((e) => selectedExtras.includes(e.nameIngredient));
        onConfirm(extras);
        setSelectedExtras([]);
        onClose();
    };

    return (
        <Drawer.Root open={isOpen}>
            <Drawer.Backdrop />
            <DrawerContent>
                <Drawer.CloseTrigger />
                <DrawerHeader>{pizza.namePizza}</DrawerHeader>

                <DrawerBody>
                    <CheckboxGroup
                        value={selectedExtras}
                        onCheckedChange={(values: string[]) => setSelectedExtras(values)}
                    >
                        <Stack>
                            {pizza.extras.map((extra) => (
                                <Checkbox.Root key={extra.nameIngredient} value={extra.nameIngredient}>
                                    {extra.nameIngredient} (+{extra.price} руб.)
                                </Checkbox.Root>
                            ))}
                        </Stack>
                    </CheckboxGroup>
                </DrawerBody>

                <DrawerFooter>
                    <Button colorScheme="teal" mr={3} onClick={handleConfirm}>
                        Добавить
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                        Отмена
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer.Root>
    );
};
