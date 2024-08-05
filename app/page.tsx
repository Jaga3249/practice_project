"use client";
import { useRouter } from "next/navigation";
interface projectListType {
  title: string;
  buttonLabel: string;
  redirectUrl: string;
}

export default function Home() {
  const router = useRouter();
  const projectList: projectListType[] = [
    {
      title: "Calculator",
      buttonLabel: "Visit",
      redirectUrl: "/calculator",
    },
    {
      title: "Memory Game",
      buttonLabel: "Visit",
      redirectUrl: "/memorygame",
    },
    {
      title: "Tic Tac Toe",
      buttonLabel: "Visit",
      redirectUrl: "/tictactoe",
    },
    {
      title: "Drag Drop",
      buttonLabel: "Visit",
      redirectUrl: "/dragdrop",
    },
    {
      title: "Bar Chart",
      buttonLabel: "Visit",
      redirectUrl: "/barchart",
    },
    {
      title: "Star Rating",
      buttonLabel: "Visit",
      redirectUrl: "/rating",
    },
    {
      title: "OtpInput",
      buttonLabel: "Visit",
      redirectUrl: "/otpinput",
    },
    {
      title: "Infinite Scrolling",
      buttonLabel: "Visit",
      redirectUrl: "/infinitescrolling",
    },
    {
      title: "Accordion",
      buttonLabel: "Visit",
      redirectUrl: "/accordion",
    },
    {
      title: "LatestJob",
      buttonLabel: "Visit",
      redirectUrl: "/latestjob",
    },
    {
      title: "Crypto Converter",
      buttonLabel: "Visit",
      redirectUrl: "/cryptoconverter",
    },
    {
      title: "Product Filter",
      buttonLabel: "Visit",
      redirectUrl: "/productfilter",
    },
    {
      title: "Custum Tabs",
      buttonLabel: "Visit",
      redirectUrl: "/customtabs",
    },
    {
      title: "Add Cart Page",
      buttonLabel: "Visit",
      redirectUrl: "/addtocart",
    },
    {
      title: "Debounce Suggestion",
      buttonLabel: "Visit",
      redirectUrl: "/debouncesuggestion",
    },
    {
      title: "Transfer Lists",
      buttonLabel: "Visit",
      redirectUrl: "/transferlists",
    },
  ];
  const handleNavigate = (url: string) => {
    router.push(url);
  };
  return (
    <div className=" h-auto sm:w-[100vw]  flex    flex-col items-center  gap-10 pt-6  px-10 ">
      <h1 className="font-bold text-4xl font-serif">Practice Project</h1>
      <div className="flex flex-col justify-center  flex-wrap sm:flex-row gap-6 ">
        {projectList.map((item, i) => (
          <div className="card   bg-neutral  w-64 shadow-xl" key={i}>
            <div className="card-body gap-4 items-center text-center">
              <h2 className="card-title font-serif text-xl">{item.title}</h2>
              <div className="card-actions">
                <button
                  className="btn   btn-primary"
                  onClick={() => handleNavigate(item.redirectUrl)}
                >
                  {item.buttonLabel}
                </button>
                {/* <button className="btn btn-neutral">visit</button> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
