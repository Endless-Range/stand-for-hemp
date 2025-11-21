/**
 * Stand for Hemp - Footer Configuration
 *
 * Footer for the advocacy campaign with Endless Range attribution.
 */

export const footerConfig = {
  // Company information
  companyName: 'Stand for Hemp',
  tagline: 'A grassroots movement to mobilize Americans to contact their representatives and fight for sensible hemp regulation.',

  // Footer columns
  columns: [
    {
      title: 'Quick Links',
      links: [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about/' },
                { label: 'Blog', href: '/blog/' },
        { label: 'Contact', href: '/contact/' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Sign the National Petition', href: 'https://c.org/Wn5jc42hcj' },
        { label: 'Impact Map', href: '/#impact-map' },
        { label: 'Take Action', href: '/take-action/' },
      ]
    }
  ],

  // Social media links - will be added when campaign social accounts are created
  socialLinks: [],

  // Footer styling - using brand Warm Cream color
  backgroundColor: 'bg-[#f5f1e8]',

  // Endless Range attribution
  endlessRangeUrl: 'https://endlessrange.com'
};

