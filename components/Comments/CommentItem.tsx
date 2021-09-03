import React from 'react';

export interface CommentItemProps {
  author: { email: string; name: string };
  content: string;
}

const CommentItem: React.FC<CommentItemProps> = ({ author, content }) => {
  return (
    <div className="card flex flex-col p-4 w-full relative text-gray-600">
      {content.split(/\n/g).map((p, index) => (
        <p key={index} className="paragraph-1 z-10">
          {p}
        </p>
      ))}
      <div className="text-sm font-bold text-right">{author.name}</div>
      <span className="absolute text-7xl font-besley font-black opacity-25 -top-12 select-none">
        ,,
      </span>
    </div>
  );
};

export default CommentItem;
