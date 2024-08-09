import { Children } from "react";

interface dataType {
  question: string;
  answer: string;
}
interface FileStrType {
  name: string;
  isFolder: Boolean;
  Children?: FileStrType[];
}

interface questionType {
  question: string;
  answerOptions: { text: string; isCorrect: boolean }[];
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

export const vscodeFolderStructure: FileStrType = {
  name: "root",
  isFolder: true,
  Children: [
    {
      name: "src",
      isFolder: true,
      Children: [
        {
          name: "App.js",
          isFolder: false,
        },
        {
          name: "index.js",
          isFolder: false,
        },
        {
          name: "index.css",
          isFolder: false,
        },
      ],
    },
    {
      name: "public",
      isFolder: true,
      Children: [
        {
          name: "index.html",
          isFolder: false,
        },
        {
          name: "style.css",
          isFolder: false,
        },
      ],
    },
    {
      name: "package.json",
      isFolder: false,
    },
  ],
};

export const QuestionList: questionType[] = [
  {
    question: "What is the largest planet in our solar system?",
    answerOptions: [
      { text: "Saturn", isCorrect: false },
      { text: "Mars", isCorrect: false },
      { text: "Earth", isCorrect: false },
      { text: "Jupiter", isCorrect: true },
    ],
  },
  {
    question: "What is the tallest mountain in the world?",
    answerOptions: [
      { text: "Mount Everest", isCorrect: true },
      { text: "K2", isCorrect: false },
      { text: "Kangchenjunga", isCorrect: false },
      { text: "Lhotse", isCorrect: false },
    ],
  },
  {
    question: "Which country is home to the Great Wall of China?",
    answerOptions: [
      { text: "China", isCorrect: true },
      { text: "Japan", isCorrect: false },
      { text: "Korea", isCorrect: false },
      { text: "India", isCorrect: false },
    ],
  },
  {
    question: "What is the capital of France?",
    answerOptions: [
      { text: "London", isCorrect: false },
      { text: "Berlin", isCorrect: false },
      { text: "Paris", isCorrect: true },
      { text: "Rome", isCorrect: false },
    ],
  },
  {
    question: "What is the chemical formula for water?",
    answerOptions: [
      { text: "H2O", isCorrect: true },
      { text: "CO2", isCorrect: false },
      { text: "NaCl", isCorrect: false },
      { text: "NH3", isCorrect: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answerOptions: [
      { text: "Atlantic Ocean", isCorrect: false },
      { text: "Pacific Ocean", isCorrect: true },
      { text: "Indian Ocean", isCorrect: false },
      { text: "Arctic Ocean", isCorrect: false },
    ],
  },
  {
    question: "What is the most popular social media platform?",
    answerOptions: [
      { text: "Instagram", isCorrect: true },
      { text: "Facebook", isCorrect: false },
      { text: "Twitter", isCorrect: false },
      { text: "YouTube", isCorrect: false },
    ],
  },
  {
    question: "What is the currency of Japan?",
    answerOptions: [
      { text: "Euro", isCorrect: false },
      { text: "US Dollar", isCorrect: false },
      { text: "Japanese Yen", isCorrect: true },
      { text: "Chinese Yuan", isCorrect: false },
    ],
  },
  {
    question: "What is the world's largest search engine?",
    answerOptions: [
      { text: "Google", isCorrect: true },
      { text: "Bing", isCorrect: false },
      { text: "Yahoo", isCorrect: false },
      { text: "DuckDuckGo", isCorrect: false },
    ],
  },
  {
    question: "Who painted the Mona Lisa?",
    answerOptions: [
      { text: "Michelangelo", isCorrect: false },
      { text: "Leonardo da Vinci", isCorrect: true },
      { text: "Sandro Botticelli", isCorrect: false },
      { text: "Raphael", isCorrect: false },
    ],
  },
];
