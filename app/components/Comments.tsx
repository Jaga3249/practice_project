"use client";
import { FC, KeyboardEvent, useRef, useState } from "react";

interface Comment {
  id: number;
  display: string;
  children: Comment[];
}
interface commentsPropType {
  comment: Comment;
  addReply: (commentId: number, text: string) => void;
}
const Comments: FC<commentsPropType> = ({ comment, addReply }) => {
  const [showReplyBox, setShowReplyBox] = useState<boolean>(false);
  const [replyText, setReplyText] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleReply = () => {
    setShowReplyBox(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 1);
  };
  const handleCancelReply = () => {
    setShowReplyBox(false);
    setReplyText("");
  };
  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    commentId: number
  ) => {
    if (e.key === "Enter") {
      handleReplySave(commentId);
    }
  };

  const handleReplySave = (commentId: number) => {
    addReply(commentId, replyText);
    setShowReplyBox(false);
    setReplyText("");
  };

  return (
    <li className="text-lg font-mono  ">
      {comment.display}
      {/*showReplyBox is false  */}
      {!showReplyBox && (
        <button
          className="btn btn-active btn-neutral btn-sm"
          onClick={handleReply}
        >
          reply
        </button>
      )}
      {/*showReplyBox is true  */}
      {showReplyBox && (
        <>
          <br />
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered  max-w-sm"
            ref={inputRef}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, comment.id)}
          />
          <br />
          <div className="flex gap-2 mt-2 ">
            <button
              className="btn btn-active btn-neutral btn-sm"
              onClick={handleCancelReply}
            >
              Cancel
            </button>
            <button
              className="btn btn-active btn-neutral btn-sm"
              onClick={() => handleReplySave(comment.id)}
            >
              save
            </button>
          </div>
        </>
      )}
      {comment.children.length > 0 && (
        <ul className="pl-4">
          {comment.children.map((item, i) => (
            <Comments comment={item} addReply={addReply} key={i} />
          ))}
        </ul>
      )}
    </li>
  );
};
export default Comments;
