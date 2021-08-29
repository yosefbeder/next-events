import React from 'react';
import Header from './Header';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <main className="p-6">
        <div className="max-w-screen-md mx-auto space-y-6">{children}</div>
      </main>
    </>
  );
};

export default Layout;
