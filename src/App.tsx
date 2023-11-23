import React, { useState } from "react";
import CommentComponent from "./components/CommentComponent";

interface Comment {
  id: number;
  text: string;
  replies?: Comment[];
}

const App: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      text: "How do you comfort a JavaScript bug?",
      replies: [
        {
          id: 2,
          text: "You console it.",
          replies: [
            { id: 3, text: "How does a web designer like his coffee?" },
            { id: 4, text: "#000000" },
          ],
        },
      ],
    },
    { id: 5, text: "Bhoos. Give me internship." },
  ]);

  const handleReply = (parentId: number, replyText: string) => {
    const newComments = [...comments];
    const parentComment = findCommentById(newComments, parentId);

    if (parentComment) {
      const newReply: Comment = { id: Date.now(), text: replyText };
      if (!parentComment.replies) {
        parentComment.replies = [];
      }
      parentComment.replies.push(newReply);
      setComments(newComments);
    }
  };

  const findCommentById = (
    comments: Comment[],
    id: number
  ): Comment | undefined => {
    for (const comment of comments) {
      if (comment.id === id) {
        return comment;
      }
      if (comment.replies) {
        const found = findCommentById(comment.replies, id);
        if (found) {
          return found;
        }
      }
    }
    return undefined;
  };

  return (
    <div className="bg-black text-white p-6">
      <h1 className="flex items-center text-4xl font-bold bg-black text-white pb-6 ml-2">
        Bhoos
        <span className="p-1 border-2 rounded-lg border-orange-600 bg-orange-500 text-black">
          Games
        </span>
      </h1>
      {comments.map((comment) => (
        <CommentComponent
          key={comment.id}
          comment={comment}
          onReply={handleReply}
        />
      ))}
    </div>
  );
};

export default App;
