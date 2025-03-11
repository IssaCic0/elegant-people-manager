
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 ml-56">
        <Header />
        <main className="p-6 page-transition">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
