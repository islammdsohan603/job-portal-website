'use client';

import { useMemo, useState } from 'react';

const COMPANY_DOMAINS = {
  adobe: 'adobe.com',
  airbnb: 'airbnb.com',
  amazon: 'amazon.com',
  apple: 'apple.com',
  cloudflare: 'cloudflare.com',
  digitalocean: 'digitalocean.com',
  github: 'github.com',
  google: 'google.com',
  ibm: 'ibm.com',
  linkedin: 'linkedin.com',
  meta: 'meta.com',
  microsoft: 'microsoft.com',
  netflix: 'netflix.com',
  oracle: 'oracle.com',
  salesforce: 'salesforce.com',
  shopify: 'shopify.com',
  spotify: 'spotify.com',
  stripe: 'stripe.com',
  tesla: 'tesla.com',
  uber: 'uber.com',
};

const getDomainFromWebsite = website => {
  if (!website) return null;

  try {
    return new URL(website).hostname.replace(/^www\./, '');
  } catch {
    return website.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
  }
};

const getInitials = name => {
  if (!name) return 'CO';

  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word.charAt(0).toUpperCase())
    .join('');
};

const getFallbackLogo = ({ name, website }) => {
  const websiteDomain = getDomainFromWebsite(website);
  const mappedDomain = COMPANY_DOMAINS[name?.toLowerCase()];
  const domain = websiteDomain || mappedDomain;

  if (!domain) return null;

  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
};

const sizeClasses = {
  sm: {
    wrapper: 'h-[60px] w-[60px] rounded-xl p-2',
    initials: 'text-base',
  },
  lg: {
    wrapper: 'h-[120px] w-[120px] rounded-2xl p-3',
    initials: 'text-3xl',
  },
};

const CompanyLogo = ({ name, logo, website, size = 'sm' }) => {
  const [sourceIndex, setSourceIndex] = useState(0);
  const config = sizeClasses[size] || sizeClasses.sm;
  const fallbackLogo = useMemo(
    () => getFallbackLogo({ name, website }),
    [name, website],
  );
  const sources = [logo, fallbackLogo].filter(Boolean);
  const currentSource = sources[sourceIndex];

  return (
    <div
      className={`${config.wrapper} flex shrink-0 items-center justify-center overflow-hidden bg-white text-zinc-900`}
    >
      {currentSource ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={currentSource}
          alt={`${name || 'Company'} logo`}
          className="h-full w-full object-contain"
          referrerPolicy="no-referrer"
          onError={() => setSourceIndex(index => index + 1)}
        />
      ) : (
        <span className={`${config.initials} font-bold text-zinc-800`}>
          {getInitials(name)}
        </span>
      )}
    </div>
  );
};

export default CompanyLogo;
