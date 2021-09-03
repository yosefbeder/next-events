import React from 'react';
import { CommentType } from '../../types';
import CommentItem from './CommentItem';

interface CommentsListProps {
  items: CommentType[];
}

const CommentsList: React.FC<CommentsListProps> = ({ items }) => {
  return (
    <div className="w-full space-y-4">
      {items.map(({ id, ...itemProps }) => (
        <CommentItem key={id} {...itemProps} />
      ))}
    </div>
  );
};

export default CommentsList;
