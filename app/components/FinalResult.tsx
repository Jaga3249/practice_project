import { QuestionList } from "@/data";
import { FC, useEffect } from "react";
interface userAnswerType {
  text: string;
  isCorrect: boolean;
}
interface resultPropType {
  userAnswer: userAnswerType[];
}

const FinalResult: FC<resultPropType> = ({ userAnswer }) => {
  return (
    <div>
      <h1 className="font-serif text-2xl text-center">
        Your Score is{" "}
        <span className="text-2xl font-bold font-sans">
          {userAnswer && userAnswer.length}
        </span>
      </h1>
      {/* {QuestionList.map} */}
      {QuestionList.map((options, index) => {
        const userAnswerForQuestion = userAnswer[index];
        const isCorrect =
          userAnswerForQuestion && userAnswerForQuestion.isCorrect;
        return (
          <div
            key={index}
            className={`font-mono text-lg mb-2  ${
              isCorrect ? "text-green-500" : "text-red-500"
            }`}
          >
            {options.question}
          </div>
        );
      })}
    </div>
  );
};
export default FinalResult;
