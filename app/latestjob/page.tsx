"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface JobPostType {
  companyName: string | undefined;
  jobTitle: string | undefined;
  date: string;
  companyUrl: string;
}

const Page = () => {
  const [postIds, setPostIds] = useState<number[]>([]);
  const [postMetaData, setPostMetaData] = useState<JobPostType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const getData = async (url: string) => {
    try {
      const res = await axios.get(url);
      if (res.status === 200) {
        return res.data;
      }
    } catch (error: any) {
      console.log("error", error.message);
    }
  };

  const fetchPostsIds = async () => {
    const url = `https://hacker-news.firebaseio.com/v0/jobstories.json`;
    const data = await getData(url);
    const ids = data && data.splice(0, 9);
    setPostIds(data);
    fetchMetaData(ids);
  };

  const fetchMetaData = async (ids: number[]) => {
    const postsById = ids.map(async (id) => {
      const post = await getData(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      );
      return post;
    });
    const posts = await Promise.all(postsById);
    if (posts.length > 0) {
      const updatePosts = posts.map((post) => {
        const postDate = post.time;
        const obj: JobPostType = {
          companyName: extractCompanyName(post?.title),
          jobTitle: extractJobTitle(post?.title),
          date: extractDate(postDate.toString()),
          companyUrl: post.url
            ? post.url
            : `https://news.ycombinator.com/item?id=${post.id}`,
        };
        return obj;
      });
      const copyPostsData = [...postMetaData, ...updatePosts];
      setPostMetaData(copyPostsData);
    }
  };

  const extractCompanyName = (companyName: string) => {
    const regex = /(\w+) (\([^)]+\)) (.+)/;
    const result = companyName.match(regex);
    if (result) {
      const splitResult = [result[1], result[2], result[3]];
      const part1 = splitResult[0];
      const part2 = splitResult[1];
      return `${part1} ${part2}`;
    }
    return "N/A";
  };

  const extractJobTitle = (title: string) => {
    const regex = /(\w+) (\([^)]+\)) (.+)/;
    const result = title.match(regex);
    if (result) {
      const splitResult = [result[1], result[2], result[3]];
      const jobTitle = splitResult[2];
      return jobTitle;
    }
    return "N/A";
  };

  const extractDate = (date: string) => {
    const timestamp = parseInt(date) * 1000; // Convert from seconds to milliseconds
    const newDate = new Date(timestamp);

    const day = newDate.getDate().toString().padStart(2, "0");
    const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
    const year = newDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };

  const handleLoadMore = async () => {
    setLoading(true);
    const copyIds = [...postIds];
    if (copyIds.length > 0) {
      const ids = copyIds.splice(0, 6);
      await fetchMetaData(ids);
      setPostIds(copyIds);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPostsIds();
  }, []);

  return (
    <div className="flex  flex-col  items-center  py-10 gap-4  ">
      <h1 className="font-serif font-semibold text-3xl">Job Board</h1>
      {/* card */}
      {postMetaData.length === 0 ? (
        <span className="loading loading-bars loading-lg text-red"></span>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {postMetaData.length > 0 &&
            postMetaData.map((post, i) => (
              <div
                className="card bg-neutral text-neutral-content w-80 cursor-pointer"
                key={i}
                onClick={() => router.push(post.companyUrl)}
              >
                <div className="card-body items-center justify-between text-center">
                  <h2 className="card-title">{post.companyName}</h2>
                  <p className="text-base">{post.jobTitle}</p>
                  <p>{post.date}</p>
                </div>
              </div>
            ))}
        </div>
      )}
      {postMetaData.length > 0 &&
        (loading ? (
          <span className="loading loading-bars loading-md"></span>
        ) : (
          <button className="btn btn-secondary btn-md" onClick={handleLoadMore}>
            Load More
          </button>
        ))}
    </div>
  );
};

export default Page;
