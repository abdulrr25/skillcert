
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { certificateService } from "@/services/certificate";
import { Certificate } from "@/types";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCertificates = async () => {
      try {
        const data = await certificateService.getAllCertificates();
        setCertificates(data);
      } catch (error) {
        console.error("Error loading certificates:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCertificates();
  }, []);

  return (
    <Layout requiresAuth>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Certificates</h1>
          <p className="text-muted-foreground">
            View and manage your uploaded certificates
          </p>
        </div>
        <Button asChild className="bg-brand-blue hover:bg-brand-blue/90">
          <Link to="/upload">Upload Certificate</Link>
        </Button>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="opacity-70 animate-pulse">
              <CardHeader>
                <div className="h-7 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-5 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-muted rounded w-full mb-2"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </CardContent>
              <CardFooter>
                <div className="h-9 bg-muted rounded w-full"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : certificates.length === 0 ? (
        <Card className="text-center p-6">
          <CardHeader>
            <CardTitle>No certificates found</CardTitle>
            <CardDescription>
              You haven't uploaded any certificates yet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Upload your first certificate to get started</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild className="bg-brand-blue hover:bg-brand-blue/90">
              <Link to="/upload">Upload Certificate</Link>
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <CertificateCard key={cert.id} certificate={cert} />
          ))}
        </div>
      )}
    </Layout>
  );
};

const CertificateCard = ({ certificate }: { certificate: Certificate }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{certificate.name}</CardTitle>
            <CardDescription>{certificate.issuerName}</CardDescription>
          </div>
          <div className={`
            px-2 py-1 rounded-md text-xs font-medium
            ${certificate.status === 'verified' ? 'bg-green-100 text-green-800' : 
              certificate.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
              'bg-red-100 text-red-800'}
          `}>
            {certificate.status.charAt(0).toUpperCase() + certificate.status.slice(1)}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-2">
          <span className="text-muted-foreground">Issued to:</span> {certificate.issuedTo}
        </p>
        <p className="text-sm mb-2">
          <span className="text-muted-foreground">Issue date:</span> {certificate.issueDate}
        </p>
        {certificate.expiryDate && (
          <p className="text-sm">
            <span className="text-muted-foreground">Expires:</span> {certificate.expiryDate}
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link to={`/cert/${certificate.id}`}>View Certificate</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Dashboard;
