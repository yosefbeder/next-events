import React, { useState } from 'react';

const NewsLetter = () => {
  const [email, setEmail] = useState('');

  return (
    <form className="card w-96 mx-auto space-y-4 p-4">
      <div className="space-y-2">
        <h2 className="header-2">Stay up to speed!</h2>
        <p className="paragraph-1">
          You can enter you email here and we will sign up in our news letter
          list.
        </p>
      </div>
      <input
        type="text"
        className="input w-full"
        placeholder="johndoe@example.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button
        className="btn w-full"
        type="submit"
        disabled={
          !(() =>
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
              email,
            ))()
        }
      >
        Sign up now!
      </button>
    </form>
  );
};

export default NewsLetter;
