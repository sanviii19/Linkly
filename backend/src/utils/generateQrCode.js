import QRCode from 'qrcode';

const generateQRCode = async (url) => {
  try {
    const qrCodeBase64 = await QRCode.toDataURL(url);
    return qrCodeBase64;
  } catch (err) {
    throw new Error("QR Code generation failed");
  }
};

export default generateQRCode;