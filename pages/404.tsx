import React from 'react';
import Head from 'next/head';

const NotFound = () => {
  return (
    <>
      <Head>
        <title>404: Page not found</title>
        <meta
          name="description"
          content="A small app where you can find some events to attend."
        />
      </Head>
      <h1 className="header-1 w-max mx-auto">404: Page not found</h1>
      <hr />
      <p className="paragraph-1 text-center">
        You can go to the home page from by clicking the logo.
      </p>
    </>
  );
};

export default NotFound;
