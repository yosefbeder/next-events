import React from 'react';
import CommentItem, { CommentItemProps } from './CommentItem';

interface CommentsListProps {
  items: CommentItemProps[];
}

const CommentsList: React.FC<CommentsListProps> = ({ items }) => {
  return (
    <div className="w-full space-y-4">
      {items.map((item, index) => (
        <CommentItem key={index} {...item} />
      ))}
    </div>
  );
};

export default CommentsList;
