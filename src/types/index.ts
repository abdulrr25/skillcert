
export interface Certificate {
  id: string;
  name: string;
  description: string;
  issuedTo: string;
  issuerId: string;
  issuerName: string;
  issueDate: string;
  expiryDate?: string;
  ipfsHash: string;
  web3StorageHash: string;
  solanaHash: string;
  fileType: 'pdf' | 'image';
  status: 'verified' | 'pending' | 'expired';
  createdAt: string;
  updatedAt: string;
  ownerAddress: string;
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
