import React, { useCallback, useMemo, useState } from 'react';
import { validate } from 'validate.js';

const NewsLetter = () => {
  const [email, setEmail] = useState('');

  return (
    <form
      className="card w-96 mx-auto space-y-4 p-4"
      onSubmit={useCallback(
        async e => {
          e.preventDefault();
          try {
            console.log(email);

            const res = await fetch('/api/newsletterlist', {
              method: 'POST',
              body: JSON.stringify({ email }),
              headers: {
                'Content-Type': 'application/json',
              },
            }).then(req => req.json());

            if (!res.success) throw new Error(res.error);
            else {
              setEmail('');
              alert(
                "You're emailed has been enrolled successfully in our list",
              );
            }
          } catch (err) {
            alert(err);
          }
        },
        [email],
      )}
    >
      <div className="space-y-2">
        <h2 className="header-2">Stay up to speed!</h2>
        <p className="paragraph-1">
          Enter your email here and you&apos;ll be informed about any new event
          😉.
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
            !validate({ email }, { email: { email: true, presence: true } }))()
        }
      >
        Sign up now!
      </button>
    </form>
  );
};

export default NewsLetter;
