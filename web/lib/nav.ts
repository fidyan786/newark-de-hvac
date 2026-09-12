export type NavGroup = {
  id: string;
  label: string;
  items: { href: string; label: string; hint: string }[];
};

export const serviceGroups: NavGroup[] = [
  {
    id: "cooling",
    label: "Cooling",
    items: [
      { href: "/ac-repair-newark-de/", label: "AC Repair", hint: "Not cooling, icing, or leaking" },
      { href: "/ac-installation-newark-de/", label: "AC Installation", hint: "New or replacement cooling" },
    ],
  },
  {
    id: "heating",
    label: "Heating",
    items: [
      { href: "/furnace-repair-newark-de/", label: "Furnace Repair", hint: "No heat, short cycling, odors" },
      { href: "/furnace-installation-newark-de/", label: "Furnace Installation", hint: "Gas and oil replacements" },
    ],
  },
  {
    id: "hvac",
    label: "HVAC Systems",
    items: [
      { href: "/emergency-hvac-newark-de/", label: "Emergency HVAC", hint: "No heat or no cooling" },
      { href: "/heat-pump-repair-newark-de/", label: "Heat Pump Repair", hint: "Won’t heat or cool" },
      { href: "/heat-pump-installation-newark-de/", label: "Heat Pump Installation", hint: "Year-round systems" },
      { href: "/hvac-replacement-newark-de/", label: "HVAC Replacement", hint: "Full system changeouts" },
      { href: "/hvac-maintenance-newark-de/", label: "Maintenance", hint: "Seasonal checkups" },
      { href: "/ductless-mini-split-newark-de/", label: "Ductless Mini Splits", hint: "Additions and tight lots" },
    ],
  },
  {
    id: "air",
    label: "Air Quality",
    items: [
      { href: "/indoor-air-quality-newark-de/", label: "Indoor Air Quality", hint: "Filters, humidity, freshness" },
      { href: "/duct-cleaning-newark-de/", label: "Duct Cleaning", hint: "Dust, odor, weak airflow" },
    ],
  },
  {
    id: "commercial",
    label: "Commercial",
    items: [{ href: "/commercial-hvac-newark-de/", label: "Commercial HVAC", hint: "Shops, offices, rentals" }],
  },
];

export const primaryNav = [
  { href: "/emergency-hvac-newark-de/", label: "Emergency HVAC" },
  { href: "/furnace-repair-newark-de/", label: "Heating" },
  { href: "/ac-repair-newark-de/", label: "Cooling" },
  { href: "/heat-pump-repair-newark-de/", label: "Heat Pumps" },
  { href: "/hvac-maintenance-newark-de/", label: "Maintenance" },
  { href: "/commercial-hvac-newark-de/", label: "Commercial" },
  { href: "/service-area/", label: "Service Areas" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

export const footerServices = [
  { href: "/ac-repair-newark-de/", label: "AC Repair" },
  { href: "/furnace-repair-newark-de/", label: "Furnace Repair" },
  { href: "/heat-pump-repair-newark-de/", label: "Heat Pump Repair" },
  { href: "/emergency-hvac-newark-de/", label: "Emergency HVAC" },
  { href: "/hvac-replacement-newark-de/", label: "Replacement" },
  { href: "/hvac-maintenance-newark-de/", label: "Maintenance" },
  { href: "/ductless-mini-split-newark-de/", label: "Mini Splits" },
  { href: "/commercial-hvac-newark-de/", label: "Commercial" },
];

export const locationLinks = [
  { href: "/bear-de-hvac/", label: "Bear, DE" },
  { href: "/pike-creek-de-hvac/", label: "Pike Creek, DE" },
  { href: "/glasgow-de-hvac/", label: "Glasgow, DE" },
  { href: "/hockessin-de-hvac/", label: "Hockessin, DE" },
  { href: "/christiana-de-hvac/", label: "Christiana, DE" },
];
