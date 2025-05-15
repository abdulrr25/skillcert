
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { useWeb3Auth } from "@/hooks/use-web3-auth";

const Index = () => {
  const { isConnected, isMetaMaskInstalled, connectWallet } = useWeb3Auth();

  return (
    <Layout>
      <section className="py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Secure Certificate Verification
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Upload and verify certificates with blockchain security. Create tamper-proof records and easily share verifiable credentials.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                {isConnected ? (
                  <Button asChild size="lg" className="bg-brand-blue hover:bg-brand-blue/90">
                    <Link to="/dashboard">Go to Dashboard</Link>
                  </Button>
                ) : (
                  <Button size="lg" className="bg-brand-blue hover:bg-brand-blue/90" onClick={connectWallet} disabled={!isMetaMaskInstalled}>
                    {!isMetaMaskInstalled ? "Install MetaMask" : "Connect Wallet"}
                  </Button>
                )}
                <Button variant="outline" size="lg" asChild>
                  <Link to="/verify">Verify a Certificate</Link>
                </Button>
              </div>
            </div>
            <div className="cert-container flex items-center justify-center p-6 lg:p-10">
              <div className="relative w-full h-full min-h-[300px] lg:min-h-[400px] overflow-hidden rounded-lg border">
                <div className="absolute top-0 right-0 bg-brand-blue/10 w-full h-full" />
                <div className="absolute top-8 left-8 right-8 bg-white rounded-lg shadow-lg p-6">
                  <div className="flex justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="bg-brand-blue text-white p-2 rounded-md text-xs">CC</div>
                      <h3 className="font-semibold">Blockchain Development Certificate</h3>
                    </div>
                    <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 mr-1"
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
                  </div>
                  <div className="border-b pb-4 mb-4">
                    <p className="text-sm text-muted-foreground">This certifies that</p>
                    <p className="font-medium">John Doe</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Has successfully completed the Blockchain Development course
                    </p>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <div>Issued: May 14, 2025</div>
                    <div>ID: cert-9c7b83...</div>
                  </div>
                </div>
                <div className="absolute bottom-8 right-8 bg-white p-4 rounded-lg shadow-lg">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=https://example.com/cert/sample"
                    alt="QR Code"
                    className="w-20 h-20"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform combines blockchain technology with traditional verification methods to provide secure, tamper-proof certificates.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 mt-8">
            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-blue text-white">1</div>
              <h3 className="text-xl font-bold">Upload Certificate</h3>
              <p className="text-sm text-muted-foreground text-center">
                Upload your certificate and fill in the metadata. We'll store the file on IPFS.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-blue text-white">2</div>
              <h3 className="text-xl font-bold">Secure on Blockchain</h3>
              <p className="text-sm text-muted-foreground text-center">
                We compress and store a cryptographic hash of your certificate on Solana using zero-knowledge proofs.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-blue text-white">3</div>
              <h3 className="text-xl font-bold">Share & Verify</h3>
              <p className="text-sm text-muted-foreground text-center">
                Share your certificate with a secure link or QR code. Anyone can verify its authenticity.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
