"use client";
import { useState } from "react";
import Comments from "../components/Comments";

interface Comment {
  id: number;
  display: string;
  children: Comment[];
}

const Page = () => {
  const [inputVal, setInputVal] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      display: "hellow",
      children: [
        {
          id: 2,
          display: "very nice",
          children: [
            {
              id: 3,
              display: "awsome",
              children: [],
            },
          ],
        },
      ],
    },
    { id: 4, display: "new comment", children: [] },
  ]);

  const newComment = (text: string): Comment => {
    return {
      id: new Date().getTime(),
      display: text,
      children: [],
    };
  };

  const handleNewComment = () => {
    if (inputVal.length > 0) {
      setComments((prev) => [...prev, newComment(inputVal)]);
      setInputVal("");
    }
  };

  const addReply = (parentId: number, text: string) => {
    const copyComments = [...comments];
    addComment(copyComments, parentId, text);
    setComments(copyComments); // Update state with the modified comments
  };

  const addComment = (comments: Comment[], parentId: number, text: string) => {
    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i];
      if (comment.id === parentId) {
        comment.children.unshift(newComment(text));
        return; // Return once the comment is added to avoid unnecessary iterations
      }
      addComment(comment.children, parentId, text); // Recursive call for nested comments
    }
  };

  return (
    <div className="h-screen flex flex-col gap-4 items-center py-10">
      <h1 className="font-serif font-semibold text-2xl">Nested Comments</h1>
      {/* input and comment button */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
          <button className="btn btn-secondary" onClick={handleNewComment}>
            Comment
          </button>
        </div>
        {/* comment section */}
        <div>
          {comments.map((item, i) => (
            <Comments comment={item} addReply={addReply} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
