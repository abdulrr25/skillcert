
export interface Certificate {
  id: string;
  name: string;
  description: string;
  issuedTo: string;
  issuerId: string;
  issuerName: string;
  issueDate: string;
  expiryDate?: string;
  ipfsHash?: string;
  solanaHash?: string;
  imageUrl?: string;
  fileType: 'pdf' | 'image';
  status: 'verified' | 'pending' | 'expired';
  metadata?: Record<string, any>;
}

export interface User {
  id: string;
  address: string;
  username?: string;
  avatar?: string;
  bio?: string;
  createdAt: string;
  certificates: Certificate[];
}
