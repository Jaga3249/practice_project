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
