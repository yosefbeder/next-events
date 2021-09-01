import React from 'react';

const NewCommentForm = () => {
  return (
    <form className="card w-96 p-4 gap-4 grid grid-cols-2">
      <input type="text" className="input col-span-2" placeholder="Name" />
      <input type="text" className="input col-span-2" placeholder="Email" />
      <textarea
        id=""
        className="input col-span-2 h-60 resize-none"
        placeholder="Your comment goes here"
      ></textarea>
      <button className="btn col-span-2">Submit</button>
    </form>
  );
};

export default NewCommentForm;
