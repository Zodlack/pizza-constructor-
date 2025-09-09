import {
  Box,
  Button,
  Input,
  Stack,
  Text,
  Field,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import type { Pizza, Extra } from "../data/pizzas";
import { CartItem } from "./CartItem";
import { toaster } from "../components/ui/toaster";

interface CartStepperProps {
  items: { pizza: Pizza; extras: Extra[] }[];
}

export const CartStepper = ({ items }: CartStepperProps) => {

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
          <Text fontWeight="bold" mb={2}>
            Ваш заказ:
          </Text>
          {items.map((item, idx) => (
            <CartItem key={idx} pizza={item.pizza} extras={item.extras} />
          ))}
          <Text fontWeight="bold">Итого: {total} руб.</Text>
          <Button mt={2} colorScheme="teal" onClick={() => setStep(1)}>
            Далее
          </Button>
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
          {items.map((item, idx) => (
            <CartItem key={idx} pizza={item.pizza} extras={item.extras} />
          ))}
          <Text>Имя: {name}</Text>
          <Text>Телефон: {phone}</Text>
          <Text>Адрес: {address}</Text>
          {comment && <Text>Комментарий: {comment}</Text>}
          <Text fontWeight="bold">Итого: {total} руб.</Text>
          <Button mt={2} colorScheme="teal" onClick={handleConfirm}>
            Подтвердить
          </Button>
        </Box>
      )}
    </Box>
  );
};
