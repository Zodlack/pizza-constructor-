import {
  Box,
  Button,
  Input,
  Stack,
  Text,
  Field,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import type { Pizza, Extra } from "../../data/pizzas";
import { CartItem } from "../CartItem/CartItem";
import { toaster } from "../ui/toaster";
import classes from './CartStepper.module.css'

interface CartStepperProps {
  items: { pizza: Pizza; extras: Extra[] }[];
  onRemoveItem: (index: number) => void;
}

export const CartStepper = ({ items, onRemoveItem }: CartStepperProps) => {

  const [step, setStep] = useState<number>(() => {
    const saved = sessionStorage.getItem("cartStep");
    return saved ? Number(saved) : 0;
  });

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    sessionStorage.setItem("cartStep", step.toString());
  }, [step]);

  const total = items.reduce(
    (sum, item) =>
      sum + item.pizza.price + item.extras.reduce((s, e) => s + e.price, 0),
    0
  );

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.startsWith("8")) val = "7" + val.slice(1);
    if (!val.startsWith("7")) val = "7" + val;

    let formatted = "+7 ";
    if (val.length > 1) formatted += `(${val.slice(1, 4)}`;
    if (val.length >= 4) formatted += `) ${val.slice(4, 7)}`;
    if (val.length >= 7) formatted += `-${val.slice(7, 9)}`;
    if (val.length >= 9) formatted += `-${val.slice(9, 11)}`;

    setPhone(formatted);
  };

  useEffect(() => {
    const digits = phone.replace(/\D/g, "");
    if (digits.length !== 11) setPhoneError("Неверный формат номера");
    else setPhoneError("");
  }, [phone]);

  const handleConfirm = () => {
    if (!name || !address || phoneError) {
      toaster.create({
        title: "Ошибка",
        description: "Заполните корректно все обязательные поля",
        type: "error",
        duration: 3000,
        closable: true,
      });
      return;
    }

    toaster.create({
      title: "Заказ оформлен",
      type: "success",
      duration: 3000,
      closable: true,
    });

    sessionStorage.removeItem("cartStep");
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="md">
      {step === 0 && (
        <Box>
          <Text fontWeight="bold" mb={10}>
            Ваш заказ:
          </Text>
          {items.map((item, index) => (
            <CartItem key={index} pizza={item.pizza} extras={item.extras} onRemove={() => onRemoveItem(index)} />
          ))}
          <Text fontWeight="bold" mt={10}>Итого: {total} руб.</Text>
          {total > 0 ?
            <Button mt={2} colorScheme="teal" onClick={() => setStep(1)}>
              Далее
            </Button> :
            <Text fontWeight="bold" mb={2}>Корзина пуста</Text>
          }

        </Box>
      )}

      {step === 1 && (
        <Stack>
          <Field.Root required>
            <Field.Label>Имя</Field.Label>
            <Input
              placeholder="Имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Field.Root>

          <Field.Root required invalid={!!phoneError}>
            <Field.Label>Телефон</Field.Label>
            <Input
              placeholder="+7 (XXX) XXX-XX-XX"
              value={phone}
              onChange={handlePhoneChange}
            />
            {phoneError && <Field.ErrorText>{phoneError}</Field.ErrorText>}
          </Field.Root>

          <Field.Root required>
            <Field.Label>Адрес доставки</Field.Label>
            <Input
              placeholder="Адрес доставки"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Комментарий (опционально)</Field.Label>
            <Input
              placeholder="Комментарий"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Field.Root>

          <Button colorScheme="gray" onClick={() => setStep(0)}>
            Назад
          </Button>


          <Button
            colorScheme="teal"
            onClick={() => {
              if (!phoneError) setStep(2);
            }}
          >
            Далее
          </Button>
        </Stack>
      )}

      {step === 2 && (
        <Box>
          <Text fontWeight="bold" mb={2}>
            Подтверждение заказа
          </Text>
          {items.map((item, index) => (
            <CartItem key={index} pizza={item.pizza} extras={item.extras} />
          ))}
          <Stack className={classes.result__container}>
            <Box className={classes.result__date}>
              <Text><span>Имя: </span>{name}</Text>
              <Text><span>Телефон: </span> {phone}</Text>
              <Text><span>Адрес: </span>{address}</Text>
              {comment && <Text><span>Комментарий: </span>{comment}</Text>}
              <Text fontWeight="bold">Итого: {total} руб.</Text>
            </Box>
          </Stack>
          <Stack direction="row" mt={2}>
            <Button colorScheme="gray" onClick={() => setStep(1)}>
              Назад
            </Button>
            <Button colorScheme="teal" onClick={handleConfirm}>
              Подтвердить
            </Button>
          </Stack>
        </Box>


      )}
    </Box>
  );
};
