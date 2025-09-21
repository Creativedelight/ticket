import React from 'react';
interface QRCodeProps {
  value: string;
  size?: number;
}
export function QRCode({
  value,
  size = 128
}: QRCodeProps) {
  // This is a placeholder component for a QR code
  // In a real application, you would use a library like 'qrcode.react'
  return <div className="bg-white p-2 rounded" style={{
    width: size,
    height: size
  }}>
      <div className="border-2 border-gray-800 w-full h-full flex items-center justify-center">
        <div className="text-xs text-center">
          <div className="mb-2 font-bold">QR Code</div>
          <div className="text-gray-500 break-all px-2">{value}</div>
        </div>
      </div>
    </div>;
}