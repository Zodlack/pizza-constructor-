import {
    Drawer,
    Button,
    CloseButton,
    Checkbox,
    CheckboxGroup,
    Fieldset,
    For,
    // Stack,
} from "@chakra-ui/react";
import type { Pizza, Extra } from "../../data/pizzas";
import { useState } from "react";
import classes from './PizzaModal.module.css'

interface PizzaDrawerProps {
    pizza: Pizza | null;
    open: boolean;
    onClose: () => void;
    onConfirm: (selectedExtras: Extra[]) => void;
}

export const PizzaDrawer = ({
    pizza,
    open,
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
        <Drawer.Root open={open}>
            <Drawer.Backdrop />
            <Drawer.Positioner>
                <Drawer.Content>
                    <Drawer.CloseTrigger asChild className={classes.close}>
                        <CloseButton onClick={onClose}></CloseButton>
                    </Drawer.CloseTrigger>
                    <Drawer.Header>
                        <Drawer.Title color="black">
                            {pizza.namePizza}
                        </Drawer.Title>
                    </Drawer.Header>

                    <Drawer.Body>
                        <Fieldset.Root>
                            <CheckboxGroup
                                value={selectedExtras}
                                onValueChange={(values: string[]) => setSelectedExtras(values)}
                                name="extras"
                            >
                                <Fieldset.Legend fontSize="sm" mb="2">
                                    Выберите добавки
                                </Fieldset.Legend>
                                <Fieldset.Content>
                                    <For each={pizza.extras}>
                                        {(extra) => (
                                            <Checkbox.Root key={extra.nameIngredient} value={extra.nameIngredient}>
                                                <Checkbox.HiddenInput />
                                                <Checkbox.Control />
                                                <Checkbox.Label color="black">
                                                    {extra.nameIngredient} (+{extra.price} руб.)
                                                </Checkbox.Label>
                                            </Checkbox.Root>
                                        )}
                                    </For>
                                </Fieldset.Content>
                            </CheckboxGroup>
                        </Fieldset.Root>
                    </Drawer.Body>

                    <Drawer.Footer>
                        <Button colorScheme="teal" mr={3} onClick={handleConfirm}>
                            Добавить
                        </Button>
                        <Button onClick={onClose}>
                            Отмена
                        </Button>
                    </Drawer.Footer>
                </Drawer.Content>
            </Drawer.Positioner>
        </Drawer.Root>
    );
};
