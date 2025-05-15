
import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useWeb3Auth } from "@/hooks/use-web3-auth";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

interface LayoutProps {
  children: ReactNode;
  requiresAuth?: boolean;
}

const Layout = ({ children, requiresAuth = false }: LayoutProps) => {
  const { isConnected } = useWeb3Auth();

  if (requiresAuth && !isConnected) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container py-12">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="bg-brand-blue text-white font-bold p-4 rounded-full text-5xl mb-4">CC</div>
            <h1 className="text-3xl font-bold mb-2">Authentication Required</h1>
            <p className="text-muted-foreground mb-6">Please connect your wallet to access this page</p>
            <Button asChild>
              <Link to="/">Go Home</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container py-6 md:py-12">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
