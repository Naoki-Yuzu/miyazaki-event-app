import React, { ReactNode } from 'react';
import Footer from './footer';
import Header from './header';

const Layout = ({children} : { children: ReactNode}) => {
  return (
    <>
      <Header />
      <main className="bg-orange-50">{children}</main>
      {/* max-h-[calc(100vh-256px)] sm:max-h-[calc(100vh-264px)] */}
      <Footer />
    </>
  );
};

export default Layout;