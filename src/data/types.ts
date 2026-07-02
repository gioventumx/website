export type NavItem = { label: string; href: string };
export type CTA = { label: string; href: string };
export type Branch = { name: string; phone: string; whatsapp: string };
export type FooterLink = { label: string; href: string };

export type SocialPlatform = "instagram" | "facebook" | "tiktok";
export type SocialLink = { platform: SocialPlatform; href: string; label: string };

export type FeatureIcon = "tech" | "care" | "team";
export type Feature = { title: string; description: string; icon: FeatureIcon };

export type Service = {
  slug: string;
  category: string;
  title: string;
  description: string;
  href: string;
  more: string;
  image: string;
};

export type Review = {
  author: string;
  initial: string;
  rating: number;
  text: string;
};
