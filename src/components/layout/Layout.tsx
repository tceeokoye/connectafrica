import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
  className?: string; 
}

export const Layout = ({ children, className = "" }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navbar />
      <main className={`flex-1 pt-20 w-full ${className}`}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
