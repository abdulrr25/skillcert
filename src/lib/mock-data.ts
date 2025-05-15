
import { Certificate, User } from "@/types";

export const mockCertificates: Certificate[] = [
  {
    id: "cert-1",
    name: "Advanced Web Development",
    description: "Certification for completing the Advanced Web Development Course",
    issuedTo: "John Doe",
    issuerId: "issuer-1",
    issuerName: "Tech University",
    issueDate: "2024-05-01",
    expiryDate: "2026-05-01",
    ipfsHash: "QmXyZ123456789AbCdEf",
    solanaHash: "5xJ4v8CTP7VeP3RGfRh31Mz5GxEfzVsJ7dXA3vNH1nan",
    fileType: "pdf",
    status: "verified",
  },
  {
    id: "cert-2",
    name: "Blockchain Fundamentals",
    description: "Certification of completion for Blockchain Fundamentals course",
    issuedTo: "John Doe",
    issuerId: "issuer-2",
    issuerName: "Crypto Academy",
    issueDate: "2024-03-15",
    fileType: "image",
    status: "verified",
    ipfsHash: "QmAbC123456789XyZdEf",
  },
  {
    id: "cert-3",
    name: "Data Science Essentials",
    description: "Certification for Data Science Essentials program",
    issuedTo: "John Doe",
    issuerId: "issuer-3",
    issuerName: "Data Institute",
    issueDate: "2023-11-10",
    expiryDate: "2025-11-10",
    fileType: "pdf",
    status: "pending",
  },
];

export const mockUser: User = {
  id: "user-1",
  address: "0x1234567890abcdef1234567890abcdef12345678",
  username: "johndoe",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  bio: "Blockchain enthusiast and developer",
  createdAt: "2023-01-01",
  certificates: mockCertificates,
};
