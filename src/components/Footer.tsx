
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-sm text-muted-foreground">
          © 2025 CertChain. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link
            to="/terms"
            className="text-sm underline-offset-4 hover:underline text-muted-foreground"
          >
            Terms
          </Link>
          <Link
            to="/privacy"
            className="text-sm underline-offset-4 hover:underline text-muted-foreground"
          >
            Privacy
          </Link>
          <Link
            to="/about"
            className="text-sm underline-offset-4 hover:underline text-muted-foreground"
          >
            About
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
