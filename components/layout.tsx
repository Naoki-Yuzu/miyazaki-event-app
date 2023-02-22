import React, { ReactNode } from 'react';
import Footer from './footer';
import Header from './header';

const Layout = ({children} : { children: ReactNode}) => {
  return (
    <>
      <Header />
      <main className="bg-orange-50">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;