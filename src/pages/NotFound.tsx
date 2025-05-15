
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
        <div className="bg-brand-blue text-white text-7xl font-bold p-6 rounded-2xl mb-6">
          404
        </div>
        <h1 className="text-4xl font-bold mb-2">Page Not Found</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="bg-brand-blue hover:bg-brand-blue/90">
          <Link to="/">Go Back Home</Link>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
