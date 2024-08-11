"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
interface projectListType {
  redirectUrl: string;
  title: string;
}

export default function Home() {
  const [visibleItem, setVisibleItem] = useState<number>(12);
  const router = useRouter();
  const projectList: projectListType[] = [
    {
      title: "Counter",
      redirectUrl: "/counter",
    },
    {
      title: "Calculator",
      redirectUrl: "/calculator",
    },
    {
      title: "Quiz App",
      redirectUrl: "/quizapp",
    },
    {
      title: "Memory Game",
      redirectUrl: "/memorygame",
    },
    {
      title: "Tic Tac Toe",
      redirectUrl: "/tictactoe",
    },
    {
      title: "Drag Drop",
      redirectUrl: "/dragdrop",
    },
    {
      title: "Bar Chart",
      redirectUrl: "/barchart",
    },
    {
      title: "Star Rating",
      redirectUrl: "/rating",
    },
    {
      title: "OtpInput",
      redirectUrl: "/otpinput",
    },
    {
      title: "Infinite Scrolling",
      redirectUrl: "/infinitescrolling",
    },
    {
      title: "Accordion",
      redirectUrl: "/accordion",
    },
    {
      title: "LatestJob",
      redirectUrl: "/latestjob",
    },
    {
      title: "Crypto Converter",
      redirectUrl: "/cryptoconverter",
    },
    {
      title: "Product Filter",
      redirectUrl: "/productfilter",
    },
    {
      title: "Custum Tabs",
      redirectUrl: "/customtabs",
    },
    {
      title: "Add Cart Page",
      redirectUrl: "/addtocart",
    },
    {
      title: "Shopping List",
      redirectUrl: "/shoppinglist",
    },
    {
      title: "Debounce Suggestion",
      redirectUrl: "/debouncesuggestion",
    },
    {
      title: "Transfer Lists",
      redirectUrl: "/transferlists",
    },
    {
      title: "Pogress Bar",
      redirectUrl: "/pogressbar",
    },
    {
      title: "Image Carosel",
      redirectUrl: "/imagecarosel",
    },
    {
      title: "Pagination",
      redirectUrl: "/pagination",
    },
    {
      title: "Employ Management System",
      redirectUrl: "/employdatabase",
    },
    {
      title: "Form validation",
      redirectUrl: "/formvalidation",
    },
    {
      title: "Morgage Calculator",
      redirectUrl: "morgagecalculator",
    },
    {
      title: "Stepper App",
      redirectUrl: "morgagecalculator",
    },
  ];
  const handleNavigate = (url: string) => {
    router.push(url);
  };
  console.log(visibleItem);
  return (
    <div className=" h-auto sm:w-[100vw]  flex   flex-col items-center  gap-4 pt-6  px-10 ">
      <h1 className="font-bold text-4xl font-serif">Practice Project</h1>
      <div className="flex flex-col justify-center  flex-wrap sm:flex-row gap-6 ">
        {projectList.slice(0, visibleItem).map((item, i) => (
          <div className="card   bg-neutral  w-64 shadow-xl" key={i}>
            <div className="card-body gap-4 items-center text-center">
              <h2 className="card-title font-serif text-xl">{item.title}</h2>
              <div className="card-actions">
                <button
                  className="btn   btn-primary"
                  onClick={() => handleNavigate(item.redirectUrl)}
                >
                  Visit
                </button>
                {/* <button className="btn btn-neutral">visit</button> */}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="btn btn-outline btn-secondary btn-md"
        onClick={() => setVisibleItem(visibleItem + 4)}
      >
        LoadMore
      </button>
    </div>
  );
}
