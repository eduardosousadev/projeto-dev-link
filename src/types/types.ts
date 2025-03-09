import { AnchorHTMLAttributes, ReactNode } from "react";

export interface LinkProps {
  id: string;
  name: string;
  url: string;
  background: string;
  color: string;
};

export interface SocialLinksProps {
  facebook: string;
  instagram: string;
  youtube: string;
  twitter: string;
  github: string;
  linkedin: string;
};

export interface SocialProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  url: string;
  children: ReactNode;
};