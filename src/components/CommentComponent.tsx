import { useState } from "react";

interface Comment {
  id: number;
  text: string;
  replies?: Comment[];
}

interface CommentProps {
  comment: Comment;
  onReply: (id: number, replyText: string) => void;
}

const CommentComponent: React.FC<CommentProps> = ({ comment, onReply }) => {
  const [replyText, setReplyText] = useState<string>("");
  const [isReplying, setIsReplying] = useState<boolean>(false);

  const handleReply = () => {
    onReply(comment.id, replyText);
    setReplyText("");
    setIsReplying(false);
  };

  return (
    <div>
      <div className="flex flex-col justify-center border-2 rounded-lg px-6 pb-6 pt-4 m-2 mt-4 bg-gray-900/60">
        <p className="text-lg">{comment.text}</p>
        <div className="mt-2">
          {isReplying && (
            <>
              <input
                className="text-black border-2 rounded-lg hover:border-orange-600 px-2 py-0.5"
                type="text"
                placeholder="Reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <button
                className="border-2 border-orange-600 rounded-full px-3 py-1 ml-4 hover:bg-orange-600"
                onClick={handleReply}
              >
                Post Reply
              </button>
            </>
          )}
          {!isReplying && (
            <button
              className="border-2 border-orange-600 rounded-full px-3 py-1 hover:bg-orange-600"
              onClick={() => setIsReplying(true)}
            >
              Reply
            </button>
          )}
        </div>
      </div>
      <div className="ml-10">
        {comment.replies &&
          comment.replies.map((reply) => (
            <CommentComponent
              key={reply.id}
              comment={reply}
              onReply={onReply}
            />
          ))}
      </div>
    </div>
  );
};

export default CommentComponent;
