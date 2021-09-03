import React, { useState } from 'react';

interface NewCommentFormProps {
  eventId: string;
}

const NewCommentForm: React.FC<NewCommentFormProps> = ({ eventId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');

  return (
    <form
      className="card w-96 p-4 gap-4 grid grid-cols-2"
      onSubmit={async e => {
        e.preventDefault();
        // send a request to create an entry in the database
        const req = await fetch(`/api/events/${eventId}/comments`, {
          method: 'POST',
          body: JSON.stringify({ name, email, content }),
          headers: {
            'Content-type': 'application/json',
          },
        });

        const res = await req.json();

        if (!res.success) {
          alert(res.error);
        } else {
          setName('');
          setEmail('');
          setContent('');
        }

        // reset the form or alert
      }}
    >
      <input
        type="text"
        className="input col-span-2"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="text"
        className="input col-span-2"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <textarea
        id=""
        className="input col-span-2 h-60 resize-none"
        placeholder="Your comment goes here"
        onChange={e => setContent(e.target.value)}
        value={content}
      ></textarea>
      <button
        className="btn col-span-2"
        type="submit"
        disabled={!name || !email || !content}
      >
        Submit
      </button>
    </form>
  );
};

export default NewCommentForm;
