import { Certificate } from "@/types";
import { storageService } from "./storage";
import { zkCompressionService } from "./zkCompression";
import { Buffer } from 'buffer';
import { supabase } from '@/lib/supabase';

interface CertificateService {
  uploadCertificate: (certificateData: Partial<Certificate>, file: File) => Promise<Certificate>;
  verifyCertificate: (id: string) => Promise<boolean>;
  getCertificateById: (id: string) => Promise<Certificate | null>;
  getCertificatesByOwner: (ownerAddress: string) => Promise<Certificate[]>;
  verifyOwnership: (id: string, walletAddress: string) => Promise<boolean>;
  generateShareableLink: (id: string) => string;
  generateQRCode: (id: string) => string;
};

export const certificateService: CertificateService = {
  async uploadCertificate(certificateData: Partial<Certificate>, file: File): Promise<Certificate> {
    try {
      // 1. Upload file to storage
      const ipfsUrl = await storageService.uploadToIPFS(file);
      const web3StorageUrl = await storageService.uploadToWeb3Storage(file);

      // 2. Compress certificate data using ZK
      const compressedHash = await zkCompressionService.compressCertificate({
        ...certificateData,
        fileHash: ipfsUrl,
        timestamp: new Date().toISOString()
      });

      // 3. Store metadata in Supabase
      const certificate: Certificate = {
        id: `cert-${Date.now()}`,
        name: certificateData.name || "Untitled Certificate",
        description: certificateData.description || "",
        issuedTo: certificateData.issuedTo || "Unknown",
        issuerId: certificateData.issuerId || "issuer-unknown",
        issuerName: certificateData.issuerName || "Unknown Issuer",
        issueDate: certificateData.issueDate || new Date().toISOString().split('T')[0],
        expiryDate: certificateData.expiryDate,
        ipfsHash: ipfsUrl,
        web3StorageHash: web3StorageUrl,
        solanaHash: compressedHash,
        fileType: file.type.includes("pdf") ? "pdf" : "image",
        status: "verified",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ownerAddress: certificateData.ownerAddress || ""
      };

      // 4. Generate shareable link and QR code
      const shareableLink = this.generateShareableLink(certificate.id);
      const qrCode = this.generateQRCode(shareableLink);

      // 5. Store in Supabase
      const { data, error } = await supabase
        .from('certificates')
        .insert(certificate)
        .select()
        .single();

      if (error) throw error;

      return data;
    } catch (error: any) {
      console.error('Certificate upload error:', error);
      throw new Error(error.message || 'Failed to upload certificate');
    }
  },

  async getCertificatesByOwner(ownerAddress: string): Promise<Certificate[]> {
    try {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .eq('ownerAddress', ownerAddress)
        .order('createdAt', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error('Error fetching certificates:', error);
      throw new Error(error.message || 'Failed to fetch certificates');
    }
  },

  async verifyOwnership(id: string, walletAddress: string): Promise<boolean> {
    try {
      const certificate = await this.getCertificateById(id);
      if (!certificate) {
        throw new Error('Certificate not found');
      }

      return certificate.ownerAddress.toLowerCase() === walletAddress.toLowerCase();
    } catch (error: any) {
      console.error('Ownership verification error:', error);
      throw new Error(error.message || 'Failed to verify certificate ownership');
    }
  },

  async getCertificateById(id: string): Promise<Certificate | null> {
    try {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      if (error.code === 'PGRST116') { // No rows returned
        return null;
      }
      console.error('Error fetching certificate:', error);
      throw new Error(error.message || 'Failed to fetch certificate');
    }
  },

  async verifyCertificate(id: string): Promise<boolean> {
    try {
      const certificate = await this.getCertificateById(id);
      if (!certificate) {
        throw new Error('Certificate not found');
      }

      const isValid = await zkCompressionService.verifyCertificate(certificate.solanaHash);
      return isValid;
    } catch (error: any) {
      console.error('Verification error:', error);
      throw new Error(error.message || 'Failed to verify certificate');
    }
  },

  generateShareableLink(id: string): string {
    return `${window.location.origin}/cert/${id}`;
  },

  generateQRCode(id: string): string {
    const url = `${window.location.origin}/cert/${id}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
  },
};
