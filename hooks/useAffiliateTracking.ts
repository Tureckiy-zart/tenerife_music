import { useCallback } from 'react';

interface AffiliateClickData {
  event_id: string;
  affiliate_code: string;
  user_agent?: string;
  ip_address?: string;
}

export function useAffiliateTracking() {
  const trackClick = useCallback(async (eventId: string, affiliateCode: string) => {
    try {
      const clickData: AffiliateClickData = {
        event_id: eventId,
        affiliate_code: affiliateCode,
        user_agent: navigator.userAgent,
        // Note: In a real implementation, you'd get the IP from the server
        // or use a service like ipify.org
      };

      const response = await fetch('/api/affiliates/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clickData),
      });

      if (!response.ok) {
        throw new Error(`Failed to track click: ${response.status}`);
      }

      const result = await response.json();
      console.log('Affiliate click tracked:', result);
      
      return result;
    } catch (error) {
      console.error('Error tracking affiliate click:', error);
      throw error;
    }
  }, []);

  return { trackClick };
}

export default useAffiliateTracking;
