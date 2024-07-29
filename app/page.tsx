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
  ];
  const handleNavigate = (url: string) => {
    router.push(url);
  };
  return (
    <div className="flex  flex-col items-center justify-center gap-4 pt-6">
      <h1 className="font-bold text-2xl from-accent-content">
        Practice Project
      </h1>
      <div className="flex gap-4">
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
