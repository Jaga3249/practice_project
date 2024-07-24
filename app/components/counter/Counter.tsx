"use client";
import React, { useEffect, useState } from "react";
interface countTYpe {
  hours: string;
  minutes: string;
  seconds: string;
}

const Counter = () => {
  const initialState: countTYpe = {
    hours: "",
    minutes: "",
    seconds: "",
  };
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isPause, setIsPause] = useState<boolean>(false);
  const [showResumePause, setShowResumePause] = useState<boolean>(false);
  const [countTimerVal, setCountTimerVal] = useState<countTYpe>(initialState);
  const [timerId, setTimerId] = useState<number | undefined>();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    // console.log(value);
    let validValue = value.replace(/\D/g, "").slice(0, 2);
    setCountTimerVal({ ...countTimerVal, [name]: validValue });
  };

  const handlePause = (actionType: string, countTimerVal: countTYpe) => {
    if (actionType === "Pause") {
      setIsPause(true);
      clearInterval(timerId);
    } else {
      setIsPause(false);
      runTimer(countTimerVal);
    }
  };
  const runTimer = (countTimerVal: countTYpe) => {
    setShowResumePause(true);
    let hours = parseInt(countTimerVal.hours);
    let minutes = parseInt(countTimerVal.minutes);
    let seconds = parseInt(countTimerVal.seconds);
    if (seconds > 0) {
      setCountTimerVal((prev) => ({
        ...prev,
        seconds: (parseInt(prev.seconds) - 1).toString(),
      }));
    } else if (seconds == 0 && minutes > 0) {
      setCountTimerVal({
        ...countTimerVal,
        minutes: (minutes - 1).toString(),
        seconds: (59).toString(),
      });
    } else if (minutes == 0) {
      setCountTimerVal({
        ...countTimerVal,
        hours: (hours - 1).toString(),
        minutes: (59).toString(),
        seconds: (59).toString(),
      });
    }
    if (hours === 0 && minutes === 0 && seconds === 0) {
      setShowResumePause(false);
      setCountTimerVal(initialState);
    }
  };
  useEffect(() => {
    let tid: any;
    if (isShow) {
      tid = setInterval(() => {
        runTimer(countTimerVal);
      }, 1000);
      setTimerId(tid);
    }
    return () => {
      clearInterval(tid);
    };
  }, [isShow, countTimerVal]);

  return (
    <div className="h-full  flex justify-center items-center">
      <div className="w-[30%] border-[1px] border-gray-500 flex justify-center flex-col items-center gap-4 py-4">
        <h1 className="font-bold text-2xl text-green-800">CountDown Timer</h1>
        {!isShow && (
          <>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="HH"
                className="border-[1px] border-gray-600 w-10 h-10  rounded-md text-center "
                value={countTimerVal.hours}
                name="hours"
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="MM"
                className="border-[1px] border-gray-600 w-10 h-10 rounded-md text-center"
                value={countTimerVal.minutes}
                name="minutes"
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="SS"
                className="border-[1px] border-gray-600 w-10 h-10 rounded-md flex items-center  text-center"
                value={countTimerVal.seconds}
                name="seconds"
                onChange={handleChange}
              />
            </div>
            <button
              className="bg-purple-700 px-6 py-2 rounded-sm text-white"
              onClick={() => setIsShow(true)}
            >
              Start
            </button>
          </>
        )}
        {isShow && (
          <>
            <div className="flex justify-center items-center ">
              <div className="text-4xl font-bold">
                {parseInt(countTimerVal?.hours) < 10
                  ? `0${countTimerVal.hours}`
                  : `${countTimerVal.hours}`}
              </div>
              <span className="font-bold text-4xl">:</span>
              <div className="text-4xl font-bold">
                {parseInt(countTimerVal.minutes) < 10
                  ? `0${countTimerVal.minutes}`
                  : `${countTimerVal.minutes}`}
              </div>
              <span className="font-bold text-4xl">:</span>

              <div className="text-4xl font-bold">
                {parseInt(countTimerVal.seconds) < 10
                  ? `0${countTimerVal.seconds}`
                  : `${countTimerVal.seconds}`}
              </div>
            </div>
            <div className="flex gap-2">
              {showResumePause && !isPause ? (
                <button
                  className="bg-purple-700 px-4 py-2 rounded-sm text-white"
                  onClick={() => handlePause("Pause", countTimerVal)}
                >
                  Pause
                </button>
              ) : (
                showResumePause && (
                  <button
                    className="bg-purple-700 px-4 py-2 rounded-sm text-white"
                    onClick={() => handlePause("Resume", countTimerVal)}
                  >
                    Resume
                  </button>
                )
              )}
              <button
                className="bg-purple-700 px-4 py-2 rounded-sm text-white"
                onClick={() => {
                  setIsShow(false);
                  setCountTimerVal(initialState);
                }}
              >
                Restart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default Counter;
