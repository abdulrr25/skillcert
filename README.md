🛡️ SkillCert – Decentralized Certificate Verification with ZK Compression
SkillCert is a decentralized platform for issuing, storing, and verifying certificates using blockchain, Supabase, and zero-knowledge compression on Solana. Users can share verifiable credentials via sharable links or QR codes. This project is built for the 1000x ZK Compression Hackathon, backed by Light Protocol, Helius, and Solana Foundation.


🚀 Features:

🦊 MetaMask Authentication (via RainbowKit or wagmi)

📦 Upload Certificates (PDF/Image)

🧾 Store Metadata in Supabase

🌐 Store Certificate Files on IPFS via Web3.Storage

🔐 Compress and store hashes on Solana using ZK Compression

🔗 Share via URL or QR Code

✅ Verify authenticity from the public cert page

🔒 Immutable & verifiable

⚙️ Tech Stack
Layer	Tech
Frontend	React + TypeScript + Tailwind
Wallet Auth	MetaMask + RainbowKit (wagmi)
Storage	Web3.Storage (IPFS)
Backend	Supabase (Postgres + Auth)
Blockchain	Solana + Light Protocol (ZK Compression)
Verification	QR Code Generator + Dynamic Cert Routes

🧱 Architecture
User Auth via MetaMask

User uploads cert → File saved to IPFS

Metadata saved to Supabase (owner, file CID, cert title)

Hash of cert + owner → Compressed and stored on Solana

Verification: Anyone with link/QR can verify against on-chain compressed hash

📦 Installation

git clone [https://github.com/abdulrr25/skillcert.git]
cd skillcert
npm install


🔐 Environment Variables
Create a .env file with:

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_WEB3STORAGE_TOKEN=your_web3_storage_token
VITE_SOLANA_RPC=https://api.devnet.solana.com

🧠 How ZK Compression Is Used
We use Light Protocol’s SDK to:

Compress the certificate hash and wallet address into a zk-compressed Solana account or token.

Store this lightweight, cost-efficient hash on-chain.

Verification queries compare IPFS file + user to zk-compressed hash.

Documentation: [https://www.zkcompression.com]
