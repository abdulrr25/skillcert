
import { Certificate } from "@/types";
import { mockCertificates } from "@/lib/mock-data";

// This is a mock service. In a real application, these functions would interact with Supabase and blockchain.
export const certificateService = {
  getAllCertificates: async (): Promise<Certificate[]> => {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockCertificates);
      }, 500);
    });
  },
  
  getCertificateById: async (id: string): Promise<Certificate | undefined> => {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const certificate = mockCertificates.find((cert) => cert.id === id);
        resolve(certificate);
      }, 500);
    });
  },
  
  uploadCertificate: async (certificateData: Partial<Certificate>, file: File): Promise<Certificate> => {
    // Mock upload logic
    console.log("Upload certificate:", certificateData, file);
    
    // In a real implementation, this would:
    // 1. Upload file to IPFS/Web3.Storage
    // 2. Calculate and store hash on Solana using Light Protocol
    // 3. Store metadata in Supabase
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const newCertificate: Certificate = {
          id: `cert-${Date.now()}`,
          name: certificateData.name || "Untitled Certificate",
          description: certificateData.description || "",
          issuedTo: certificateData.issuedTo || "Unknown",
          issuerId: certificateData.issuerId || "issuer-unknown",
          issuerName: certificateData.issuerName || "Unknown Issuer",
          issueDate: certificateData.issueDate || new Date().toISOString().split('T')[0],
          expiryDate: certificateData.expiryDate,
          ipfsHash: `QmMock${Math.random().toString(36).substring(2, 10)}`,
          solanaHash: `${Math.random().toString(36).substring(2, 30)}`,
          fileType: file.type.includes("pdf") ? "pdf" : "image",
          status: "pending",
        };
        resolve(newCertificate);
      }, 1500);
    });
  },
  
  verifyCertificate: async (id: string): Promise<boolean> => {
    // Mock verification logic
    console.log("Verify certificate:", id);
    
    // In a real implementation, this would:
    // 1. Fetch certificate data from Supabase
    // 2. Verify the hash on Solana using Light Protocol
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  },
  
  generateShareableLink: (id: string): string => {
    // Generate a shareable link for the certificate
    return `${window.location.origin}/cert/${id}`;
  },
  
  generateQRCode: (id: string): string => {
    // In a real app, this would generate a QR code
    const url = `${window.location.origin}/cert/${id}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
  },
};
