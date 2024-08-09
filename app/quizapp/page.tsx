"use client";
import { useState } from "react";
import Question from "../components/Question";
import { QuestionList } from "@/data";
import FinalResult from "../components/FinalResult";

interface userAnswerType {
  text: string;
  isCorrect: boolean;
}

const Page = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<userAnswerType[]>([]);

  return (
    <div className="h-screen flex flex-col items-center my-10 gap-4  ">
      <h1 className="font-serif font-semibold text-3xl">Quiz App</h1>
      {/* Question Components */}
      <Question
        question={QuestionList[currentQuestion]}
        setCurrentQuestion={setCurrentQuestion}
        setUserAnswer={setUserAnswer}
        currentQuestion={currentQuestion}
        QuestionList={QuestionList}
      />
      {/* answer components */}
      {currentQuestion > QuestionList.length - 1 && (
        <FinalResult userAnswer={userAnswer} />
      )}

      {/* answer components */}
    </div>
  );
};
export default Page;
