export interface Extra {
    nameIngredient: string,
    price: number
}

export interface Pizza {
    id: number,
    namePizza: string,
    price: number,
    image: string,
    extras: Extra[]
}

export const pizzas: Pizza[] = [
    {
        id: 1,
        namePizza: 'Пепперони',
        price: 500,
        image: 'https://via.placeholder.com/150',
        extras: [
            { nameIngredient: 'Сыр моцарелла', price: 50 },
            { nameIngredient: 'Острый соус', price: 30 },
            { nameIngredient: 'Оливки', price: 40 },
            { nameIngredient: 'Доп. пепперони', price: 70 },
        ]
    },
    {
        id: 2,
        namePizza: 'Маргарита',
        price: 400,
        image: 'https://via.placeholder.com/150',
        extras: [
            { nameIngredient: 'Базилик ', price: 20 },
            { nameIngredient: 'Помидоры черри', price: 40 },
            { nameIngredient: 'Допю сыр', price: 50 },
            { nameIngredient: 'Песто', price: 30 },
        ]
    },
    {
        id: 3,
        namePizza: "Четыре сыра",
        price: 550,
        image: "https://via.placeholder.com/150",
        extras: [
            { nameIngredient: "Горгонзола", price: 60 },
            { nameIngredient: "Чеддер", price: 50 },
            { nameIngredient: "Сливочный соус", price: 30 },
            { nameIngredient: "Грибы", price: 40 },
        ],
    },
    {
        id: 4,
        namePizza: "Четыре сыра",
        price: 550,
        image: "https://via.placeholder.com/150",
        extras: [
            { nameIngredient: "Горгонзола", price: 60 },
            { nameIngredient: "Чеддер", price: 50 },
            { nameIngredient: "Сливочный соус", price: 30 },
            { nameIngredient: "Грибы", price: 40 },
        ],
    },
    {
        id: 5,
        namePizza: "Гавайская",
        price: 480,
        image: "https://via.placeholder.com/150",
        extras: [
            { nameIngredient: "Доп. ананас", price: 30 },
            { nameIngredient: "Ветчина", price: 50 },
            { nameIngredient: "Острый соус", price: 30 },
            { nameIngredient: "Моцарелла", price: 50 },
        ],
    },
    {
        id: 6,
        namePizza: "Барбекю",
        price: 530,
        image: "https://via.placeholder.com/150",
        extras: [
            { nameIngredient: "Курица", price: 50 },
            { nameIngredient: "Бекон", price: 50 },
            { nameIngredient: "Лук", price: 20 },
            { nameIngredient: "Соус барбекю", price: 30 },
        ],
    },
    {
        id: 7,
        namePizza: "Вегетарианская",
        price: 450,
        image: "https://via.placeholder.com/150",
        extras: [
            { nameIngredient: "Баклажаны", price: 40 },
            { nameIngredient: "Цукини", price: 40 },
            { nameIngredient: "Перец болгарский", price: 30 },
            { nameIngredient: "Брокколи", price: 30 },
        ],
    },
    {
        id: 8,
        namePizza: "Мясная",
        price: 560,
        image: "https://via.placeholder.com/150",
        extras: [
            { nameIngredient: "Салями", price: 50 },
            { nameIngredient: "Бекон", price: 50 },
            { nameIngredient: "Курица", price: 50 },
            { nameIngredient: "Говядина", price: 70 },
        ],
    },
    {
        id: 9,
        namePizza: "Дьябло",
        price: 520,
        image: "https://via.placeholder.com/150",
        extras: [
            { nameIngredient: "Халапеньо", price: 30 },
            { nameIngredient: "Острый соус", price: 30 },
            { nameIngredient: "Доп. пепперони", price: 70 },
            { nameIngredient: "Лук красный", price: 20 },
        ],
    },
    {
        id: 10,
        namePizza: "С грибами",
        price: 470,
        image: "https://via.placeholder.com/150",
        extras: [
            { nameIngredient: "Белые грибы", price: 50 },
            { nameIngredient: "Трюфельное масло", price: 60 },
            { nameIngredient: "Шампиньоны", price: 40 },
            { nameIngredient: "Лук", price: 20 },
        ],
    },
    {
        id: 11,
        namePizza: "С морепродуктами",
        price: 600,
        image: "https://via.placeholder.com/150",
        extras: [
            { nameIngredient: "Креветки", price: 80 },
            { nameIngredient: "Кальмары", price: 70 },
            { nameIngredient: "Мидии", price: 60 },
            { nameIngredient: "Лимон", price: 10 },
        ],
    },

]