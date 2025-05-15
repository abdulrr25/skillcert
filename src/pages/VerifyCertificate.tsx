
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { certificateService } from "@/services/certificate";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const VerifyCertificate = () => {
  const [certificateId, setCertificateId] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!certificateId.trim()) {
      toast({
        title: "Certificate ID required",
        description: "Please enter a certificate ID to verify",
        variant: "destructive",
      });
      return;
    }
    
    setIsVerifying(true);
    
    try {
      // First check if certificate exists
      const cert = await certificateService.getCertificateById(certificateId);
      
      if (!cert) {
        toast({
          title: "Certificate not found",
          description: "No certificate found with the provided ID",
          variant: "destructive",
        });
        return;
      }
      
      navigate(`/cert/${certificateId}`);
    } catch (error) {
      console.error("Error verifying certificate:", error);
      toast({
        title: "Verification failed",
        description: "Could not verify the certificate",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Verify Certificate</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Certificate Verification</CardTitle>
            <CardDescription>
              Enter a certificate ID or scan a QR code to verify the authenticity of a certificate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="id" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="id">Verify by ID</TabsTrigger>
                <TabsTrigger value="qr">Scan QR Code</TabsTrigger>
              </TabsList>
              <TabsContent value="id" className="mt-4">
                <form onSubmit={handleVerify} className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="certificateId">Certificate ID</Label>
                    <Input
                      id="certificateId"
                      placeholder="Enter certificate ID (e.g., cert-123456)"
                      value={certificateId}
                      onChange={(e) => setCertificateId(e.target.value)}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="bg-brand-blue hover:bg-brand-blue/90 w-full"
                    disabled={isVerifying}
                  >
                    {isVerifying ? "Verifying..." : "Verify Certificate"}
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="qr" className="mt-4">
                <div className="bg-muted/50 rounded-lg p-8 text-center">
                  <div className="mb-4 flex justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-muted-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    QR code scanning coming soon - please verify using the certificate ID for now.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => document.querySelector('[data-value="id"]')?.click()}
                  >
                    Verify Using ID Instead
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="mt-8 bg-muted p-6 rounded-lg">
          <h2 className="font-semibold text-xl mb-4">About Certificate Verification</h2>
          <div className="space-y-4">
            <p>
              Our certificate verification system ensures the authenticity of certificates through blockchain technology:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Each certificate has a unique identifier stored on the Solana blockchain</li>
              <li>We use zero-knowledge proofs to compress and secure the certificate data</li>
              <li>The original file is stored on IPFS (InterPlanetary File System) for permanence</li>
              <li>Verification confirms both the file integrity and blockchain registration</li>
            </ul>
            <p className="text-sm text-muted-foreground">
              ⓘ For technical verification details, please refer to our <a href="#" className="text-brand-blue hover:underline">documentation</a>.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VerifyCertificate;
