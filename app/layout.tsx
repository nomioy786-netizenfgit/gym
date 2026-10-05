import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'GYM - Be Stronger Than Your Excuses | Fitness & Memberships',
  description: 'Join GYM and transform your body with expert trainers, modern equipment, and personalized fitness programs in Pakistan. Easy joining via WhatsApp.',
  openGraph: {
    title: 'GYM - Be Stronger Than Your Excuses',
    description: 'Transform your body with expert trainers, modern equipment, and personalized fitness programs. Join via WhatsApp at 03417885841.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GYM - Fitness Center & Memberships',
    description: 'Build your body. Build your confidence. Premium gym membership plans in PKR.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
