"use client";
import React, { useEffect, useRef, useState } from "react";
interface countTYpe {
  hours: string;
  minutes: string;
  seconds: string;
}

const Page = () => {
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
  const hourRef = useRef(null);
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
    <div className="h-screen  flex items-center justify-center ">
      <div className="w-1/2  flex justify-center flex-col items-center gap-4 ">
        <h1 className="font-bold text-3xl font-serif">CountDown Timer</h1>
        {!isShow && (
          <>
            <div className="flex gap-2 items-center justify-center">
              <input
                type="text"
                placeholder="HH"
                className={`input input-bordered  w-16 h-16 text-center font-bold text-xl`}
                value={countTimerVal.hours}
                name="hours"
                onChange={handleChange}
                ref={hourRef}
              />
              <input
                type="text"
                placeholder="MM"
                className="input input-bordered  w-16 h-16 text-center text-xl "
                value={countTimerVal.minutes}
                name="minutes"
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="SS"
                className="input input-bordered  w-16 h-16 text-center font-bold text-xl"
                value={countTimerVal.seconds}
                name="seconds"
                onChange={handleChange}
              />
            </div>
            <button
              className="btn btn-active btn-primary btn-md "
              onClick={() => setIsShow(true)}
            >
              Start
            </button>
          </>
        )}
        {isShow && (
          <>
            <div className="flex justify-center items-center ">
              <div className="text-4xl font-bold text-white">
                {parseInt(countTimerVal?.hours) < 10
                  ? `0${countTimerVal.hours}`
                  : `${countTimerVal.hours}`}
              </div>
              <span className="font-bold text-4xl">:</span>
              <div className="text-4xl font-bold text-white">
                {parseInt(countTimerVal.minutes) < 10
                  ? `0${countTimerVal.minutes}`
                  : `${countTimerVal.minutes}`}
              </div>
              <span className="font-bold text-4xl">:</span>

              <div className="text-4xl font-bold text-white">
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
export default Page;
