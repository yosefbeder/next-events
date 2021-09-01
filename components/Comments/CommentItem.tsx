import React from 'react';

export interface CommentItemProps {
  author: string;
  content: string;
}

const CommentItem: React.FC<CommentItemProps> = ({ author, content }) => {
  return (
    <div className="card p-4 w-full relative text-gray-600">
      <div className="text-lg ">
        {content} - <span className="text-sm font-bold">{author}</span>
      </div>
      <span className="absolute text-7xl font-besley font-black opacity-25 bottom-12 select-none">
        ,,
      </span>
    </div>
  );
};

export default CommentItem;
