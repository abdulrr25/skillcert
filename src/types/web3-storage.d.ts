declare module 'web3.storage' {
  interface Web3StorageOptions {
    token: string;
    endpoint?: URL | string | Request;
  }

  interface PutOptions {
    name?: string;
    maxRetries?: number;
    wrapWithDirectory?: boolean;
  }

  // Define the Web3Storage File class
  class Web3StorageFile extends globalThis.File {
    constructor(
      bits: BlobPart[],
      name: string,
      options?: { type?: string; lastModified?: number }
    );
  }

  interface Status {
    cid: string;
    deals: Array<{
      status: string;
      lastChanged: string;
      chainDealID: string;
      datamodelSelector: string;
      statusText: string;
      dealActivation: string;
      dealExpiration: string;
    }>;
    pin: {
      cid: string;
      name?: string;
      status: string;
      created: string;
      size: number;
    };
    created: string;
  }

  // Define the Web3Storage client class
  class Web3StorageClient {
    constructor(options: Web3StorageOptions);
    put(
      files: Iterable<Web3StorageFile>,
      options?: PutOptions
    ): Promise<string>; // Returns the IPFS CID of the uploaded files
    get(cid: string): Promise<Array<Web3StorageFile>>;
    status(cid: string): Promise<Status>;
  }

  // Export the Web3Storage class with static File property
  interface Web3StorageWithFile extends Web3StorageClient {
    File: typeof Web3StorageFile;
  }

  // Export the Web3Storage class as the default export
  const Web3Storage: {
    new (options: Web3StorageOptions): Web3StorageWithFile;
    File: typeof Web3StorageFile;
  };
  
  export default Web3Storage;

  // Export other types for convenience
  export type { 
    Web3StorageOptions, 
    PutOptions, 
    Status, 
    Web3StorageFile as File,
    Web3StorageClient as Client
  };
}
