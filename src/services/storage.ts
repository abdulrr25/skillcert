import { create } from 'ipfs-http-client';
import Web3Storage from 'web3.storage';

// Initialize IPFS client
const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  apiPath: '/api/v0'
});

// Initialize Web3.Storage client
const getWeb3StorageClient = () => {
  const token = import.meta.env.VITE_WEB3_STORAGE_TOKEN;
  if (!token) {
    throw new Error('Web3.Storage token is not configured');
  }
  return new Web3Storage({ token });
};

interface StorageService {
  uploadToIPFS: (file: File) => Promise<string>;
  uploadToWeb3Storage: (file: File) => Promise<string>;
}

export const storageService: StorageService = {
  async uploadToIPFS(file: File): Promise<string> {
    try {
      const buffer = Buffer.from(await file.arrayBuffer());
      const result = await ipfs.add(buffer);
      return `https://ipfs.io/ipfs/${result.path}`;
    } catch (error) {
      console.error('IPFS upload error:', error);
      throw new Error('Failed to upload to IPFS');
    }
  },

  async uploadToWeb3Storage(file: globalThis.File): Promise<string> {
    try {
      const client = getWeb3StorageClient();
      // Create a new Web3Storage File instance with the file content
      const web3File = new Web3Storage.File(
        [await file.arrayBuffer()],
        file.name,
        { type: file.type }
      );
      
      // Upload the file
      const cid = await (client.put as any)([web3File], {
        name: file.name,
        wrapWithDirectory: false
      });
      
      return `https://${cid}.ipfs.w3s.link/${encodeURIComponent(file.name)}`;
    } catch (error: any) {
      console.error('Web3.Storage upload error:', error);
      throw new Error(`Failed to upload to Web3.Storage: ${error.message}`);
    }
  },
};
