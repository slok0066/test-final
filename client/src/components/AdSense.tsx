import React, { useEffect } from 'react';

interface AdSenseProps {
  adSlot: string;
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  style?: React.CSSProperties;
}

export const AdSense: React.FC<AdSenseProps> = ({ 
  adSlot, 
  adFormat = 'auto', 
  style = { display: 'block' } 
}) => {
  useEffect(() => {
    try {
      console.log(`Attempting to load AdSense ad with slot: ${adSlot}`);
      
      // Check if adsbygoogle is defined
      if (typeof window.adsbygoogle === 'undefined') {
        console.warn('AdSense not loaded yet. This is normal during development or if the script is blocked.');
      }
      
      // Push the ad
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      console.log('AdSense push completed');
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, [adSlot]);

  return (
    <div className="ad-container my-4 border border-dashed border-gray-200 p-2">
      <div className="text-xs text-gray-400 text-center mb-1">Advertisement</div>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-1186330298143991"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
};

// Add TypeScript declaration for adsbygoogle
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default AdSense; 