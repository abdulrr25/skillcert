import QRCode from 'qrcode';

interface QRCodeService {
  generateQRCode: (text: string, options?: QRCode.QRCodeToDataURLOptions) => Promise<string>;
}

export const qrCodeService: QRCodeService = {
  async generateQRCode(text: string, options = { 
    width: 256,
    margin: 1,
    color: {
      dark: '#000000',
      light: '#ffffff'
    }
  }): Promise<string> {
    try {
      const qrCode = await QRCode.toDataURL(text, options);
      return qrCode;
    } catch (error) {
      console.error('QR code generation error:', error);
      throw new Error('Failed to generate QR code');
    }
  }
};
