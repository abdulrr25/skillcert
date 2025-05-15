
import { Button } from "@/components/ui/button";
import { useWeb3Auth } from "@/hooks/use-web3-auth";
import { Link } from "react-router-dom";

const Header = () => {
  const { address, isConnected, isConnecting, connectWallet, disconnectWallet } = useWeb3Auth();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-brand-blue text-white font-bold p-2 rounded">CC</div>
          <span className="font-bold text-xl">CertChain</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link
            to="/dashboard"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Dashboard
          </Link>
          <Link
            to="/upload"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Upload Certificate
          </Link>
          <Link
            to="/verify"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Verify Certificate
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {isConnected ? (
            <div className="flex items-center gap-2">
              <div className="text-sm bg-muted px-3 py-1 rounded-md hidden md:block">
                {address?.substring(0, 6)}...{address?.substring(38)}
              </div>
              <Button size="sm" variant="outline" onClick={disconnectWallet}>
                Disconnect
              </Button>
            </div>
          ) : (
            <Button 
              size="sm" 
              onClick={connectWallet} 
              disabled={isConnecting}
            >
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
