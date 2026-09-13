import { hasPhone, site } from "../site";
import type { ChatBoot } from "./types";

export function getChatBoot(): ChatBoot {
  const leadWebhook = Boolean(process.env.FORM_WEBHOOK);
  const fileStore = !process.env.VERCEL;
  const ai = Boolean(process.env.OPENAI_API_KEY || process.env.AI_GATEWAY_API_KEY);
  return {
    brand: site.name,
    city: site.city,
    state: site.state,
    county: site.county,
    hasPhone,
    phoneDisplay: site.phoneDisplay,
    phoneTel: site.phoneTel,
    leadEnabled: leadWebhook || fileStore,
    aiEnabled: ai,
    emergencyDispatch: site.emergencyAvailable,
    hours: site.hours,
  };
}
