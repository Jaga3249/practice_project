"use client";
import { Dispatch, useState } from "react";
interface questionType {
  question: string;
  answerOptions: { text: string; isCorrect: boolean }[];
}
interface userAnswerType {
  text: string;
  isCorrect: boolean;
}
interface questionPropsType {
  question: questionType;
  setCurrentQuestion: Dispatch<React.SetStateAction<number>>;
  setUserAnswer: Dispatch<React.SetStateAction<userAnswerType[]>>;
  currentQuestion: number;
  QuestionList: questionType[];
}

const Question = ({
  question,
  setCurrentQuestion,
  setUserAnswer,
  currentQuestion,
  QuestionList,
}: questionPropsType) => {
  const [selectedAnswer, setSelectedAnswer] = useState<{
    text: string;
    isCorrect: boolean;
  } | null>(null);

  const handleSelectAnswer = (option: { text: string; isCorrect: boolean }) => {
    setSelectedAnswer(option);
    if (option.isCorrect) {
      setUserAnswer((prev) => [...prev, option]);
    }
  };
  const handleNext = () => {
    setCurrentQuestion((prev) => prev + 1);
    setSelectedAnswer(null);
  };

  return (
    <div className="w-1/2 flex  flex-col gap-4">
      <h1 className=" font-sans font-semibold text-xl">
        {question && question.question}
      </h1>
      <div className="grid grid-cols-2 gap-4">
        {question &&
          question.answerOptions.map((options, i) => (
            <button
              className={`btn  font-mono text-lg 
              ${
                selectedAnswer?.text === options.text
                  ? selectedAnswer.isCorrect
                    ? "btn-accent "
                    : "btn-error"
                  : ""
              } ${selectedAnswer === null && "btn-neutral "} ${
                selectedAnswer != null && options.isCorrect && "btn-accent"
              }`}
              key={i}
              onClick={() => handleSelectAnswer(options)}
              // onClick={() => setSelectedAnswer(options)}
              disabled={
                selectedAnswer != null &&
                selectedAnswer.text != options.text &&
                !options.isCorrect
              }
            >
              {options.text}
            </button>
          ))}
      </div>
      {currentQuestion <= QuestionList.length - 1 && (
        <div className=" flex justify-end">
          <button
            className="btn btn-primary w-28 "
            disabled={selectedAnswer === null}
            onClick={handleNext}
          >
            {currentQuestion === QuestionList.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      )}
    </div>
  );
};
export default Question;
