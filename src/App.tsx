
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import UploadCertificate from "./pages/UploadCertificate";
import CertificateDetail from "./pages/CertificateDetail";
import VerifyCertificate from "./pages/VerifyCertificate";
import Web3Provider from "./contexts/Web3Context";

const queryClient = new QueryClient();

// Add window ethereum type declaration
declare global {
  interface Window {
    ethereum?: any;
  }
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Web3Provider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<UploadCertificate />} />
            <Route path="/cert/:id" element={<CertificateDetail />} />
            <Route path="/verify" element={<VerifyCertificate />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Web3Provider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
