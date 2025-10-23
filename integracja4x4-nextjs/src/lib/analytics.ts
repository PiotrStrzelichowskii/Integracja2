// Google Analytics utility functions

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// Google Analytics Measurement ID
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Check if analytics consent is given
const hasAnalyticsConsent = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('analytics-consent') === 'true';
};

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag && hasAnalyticsConsent()) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Track custom events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag && hasAnalyticsConsent()) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Predefined events for common actions
export const trackEvent = {
  // Contact form events
  contactFormSubmit: () => event({
    action: 'submit',
    category: 'Contact Form',
    label: 'Form Submission',
  }),
  
  contactFormError: (error: string) => event({
    action: 'error',
    category: 'Contact Form',
    label: error,
  }),

  // Navigation events
  navigationClick: (destination: string) => event({
    action: 'click',
    category: 'Navigation',
    label: destination,
  }),

  // Testimonial events
  testimonialClick: (testimonialIndex: number) => event({
    action: 'click',
    category: 'Testimonials',
    label: `Testimonial ${testimonialIndex + 1}`,
  }),

  // Offer/Service events
  offerClick: (offerName: string) => event({
    action: 'click',
    category: 'Offers',
    label: offerName,
  }),

  // Gallery events
  galleryImageClick: (imageIndex: number) => event({
    action: 'click',
    category: 'Gallery',
    label: `Image ${imageIndex + 1}`,
  }),

  // 3D Model events
  model3DInteraction: (interaction: string) => event({
    action: 'interact',
    category: '3D Model',
    label: interaction,
  }),

  // Phone/Email clicks
  phoneClick: () => event({
    action: 'click',
    category: 'Contact',
    label: 'Phone Number',
  }),

  emailClick: () => event({
    action: 'click',
    category: 'Contact',
    label: 'Email Address',
  }),

  // Social media clicks
  socialMediaClick: (platform: string) => event({
    action: 'click',
    category: 'Social Media',
    label: platform,
  }),
};
