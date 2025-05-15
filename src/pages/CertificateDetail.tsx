
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { certificateService } from "@/services/certificate";
import { Certificate } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

const CertificateDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [shareableLink, setShareableLink] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const loadCertificate = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const cert = await certificateService.getCertificateById(id);
        if (cert) {
          setCertificate(cert);
          setIsVerified(cert.status === "verified");
          setShareableLink(certificateService.generateShareableLink(cert.id));
          setQrCodeUrl(certificateService.generateQRCode(cert.id));
        }
      } catch (error) {
        console.error("Error loading certificate:", error);
        toast({
          title: "Error",
          description: "Failed to load certificate details",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadCertificate();
  }, [id, toast]);

  const handleVerify = async () => {
    if (!certificate) return;

    setIsVerifying(true);
    try {
      const verified = await certificateService.verifyCertificate(certificate.id);
      setIsVerified(verified);
      toast({
        title: verified ? "Certificate Verified" : "Verification Failed",
        description: verified
          ? "This certificate has been verified as authentic"
          : "Could not verify this certificate",
        variant: verified ? "default" : "destructive",
      });
    } catch (error) {
      console.error("Error verifying certificate:", error);
      toast({
        title: "Error",
        description: "Failed to verify certificate",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableLink);
    toast({
      title: "Link Copied",
      description: "Shareable link copied to clipboard",
    });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-12 w-3/4 mb-6" />
          <Card className="p-6 space-y-6">
            <div className="flex justify-between">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-6 w-1/4" />
            </div>
            <Skeleton className="h-[300px] w-full" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
            <Separator />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </Card>
        </div>
      </Layout>
    );
  }

  if (!certificate) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto text-center py-12">
          <div className="bg-muted inline-flex rounded-full p-4 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">Certificate Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The certificate you are looking for does not exist or has been removed.
          </p>
          <Button asChild>
            <a href="/">Go Home</a>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-6">{certificate.name}</h1>
        <Card className="cert-container p-6">
          {/* Certificate Header */}
          <div className="cert-header">
            <div>
              <h2 className="text-xl font-semibold">{certificate.issuerName}</h2>
              <p className="text-sm text-muted-foreground">
                Issued on {certificate.issueDate}
                {certificate.expiryDate && ` · Expires on ${certificate.expiryDate}`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {isVerified || certificate.status === "verified" ? (
                <div className="cert-verification-badge">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Verified
                </div>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleVerify}
                  disabled={isVerifying}
                >
                  {isVerifying ? "Verifying..." : "Verify"}
                </Button>
              )}
            </div>
          </div>

          <Separator className="my-4" />

          {/* Certificate Content */}
          <div className="cert-content">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">CERTIFICATE ID</h3>
                  <p className="font-mono text-sm">{certificate.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">ISSUED TO</h3>
                  <p>{certificate.issuedTo}</p>
                </div>
                {certificate.description && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">DESCRIPTION</h3>
                    <p className="text-sm">{certificate.description}</p>
                  </div>
                )}
                {certificate.ipfsHash && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">IPFS HASH</h3>
                    <p className="font-mono text-xs truncate">{certificate.ipfsHash}</p>
                  </div>
                )}
                {certificate.solanaHash && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">BLOCKCHAIN HASH</h3>
                    <p className="font-mono text-xs truncate">{certificate.solanaHash}</p>
                  </div>
                )}
              </div>

              {/* Right Column - QR and Actions */}
              <div className="flex flex-col items-center justify-center space-y-4 border rounded-lg p-6 bg-background">
                <div className="bg-white p-2 rounded-lg shadow mb-2">
                  <img src={qrCodeUrl} alt="Certificate QR Code" className="w-40 h-40" />
                </div>
                <p className="text-sm text-center text-muted-foreground">
                  Scan to verify this certificate
                </p>
                <div className="w-full space-y-2">
                  <Button
                    onClick={handleCopyLink}
                    variant="outline"
                    className="w-full"
                  >
                    Copy Shareable Link
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full"
                  >
                    <a href={qrCodeUrl} download={`certificate-${certificate.id}.png`}>
                      Download QR Code
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="cert-footer">
            <p className="text-xs text-muted-foreground">
              This certificate is verified using blockchain technology. The authenticity of this certificate can be checked by scanning the QR code.
            </p>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default CertificateDetail;
