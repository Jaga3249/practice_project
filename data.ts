interface dataType {
  question: string;
  answer: string;
}
interface filterDataType {
  name: string;
  category: string;
}

export const data: dataType[] = [
  {
    question: "How many bones does a cat have?",
    answer: "A cat has 230 bones - 6 more than a human",
  },
  {
    question: "How much do cats sleep?",
    answer: "The average cat sleeps 12-16 hours per day",
  },
  {
    question: "How long do cats live?",
    answer:
      "Outdoor cats live 5 years on average. Indoor\ncats live 15 years on average.",
  },
];

export const filterData: filterDataType[] = [
  {
    name: "Prada",
    category: "Bags",
  },
  {
    name: "Gucci",
    category: "Bags",
  },
  {
    name: "Guess",
    category: "Bags",
  },
  {
    name: "Rolex",
    category: "Watches",
  },
  {
    name: "Timex",
    category: "Watches",
  },
  {
    name: "Nike",
    category: "Sports",
  },
  {
    name: "Adidas",
    category: "Sports",
  },
  {
    name: "Fila",
    category: "Sports",
  },
  {
    name: "Ray Ban",
    category: "Sunglasses",
  },
  {
    name: "Aldo",
    category: "Sunglasses",
  },
  {
    name: "Polaroid",
    category: "Sunglasses",
  },
];
