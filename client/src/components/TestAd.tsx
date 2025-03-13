import React from 'react';

// This component displays a test ad that will show even in development
// It uses Google's test ad unit which is designed to always show an ad
export const TestAd: React.FC = () => {
  return (
    <div className="ad-container my-4 border border-dashed border-gray-200 p-2">
      <div className="text-xs text-gray-400 text-center mb-1">Test Advertisement</div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-3940256099942544" // Google's test publisher ID
        data-ad-slot="1234567890" // Test ad slot
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <script>
        {`
          (adsbygoogle = window.adsbygoogle || []).push({});
        `}
      </script>
    </div>
  );
};

export default TestAd; 