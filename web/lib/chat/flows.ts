import type { ChatFacts, ChatSession, Intent } from "./types";

export type FlowStep = {
  id: string;
  prompt: (s: ChatSession) => string;
  options: { id: string; label: string; apply: Partial<ChatFacts> }[];
  pending?: { yes?: Partial<ChatFacts>; no?: Partial<ChatFacts> };
  skipIf: (s: ChatSession) => boolean;
};

const skipIfKnownStatus = (s: ChatSession) => !!s.systemStatus || s.highIntent || s.wantsService;
const skipIfKnownScope = (s: ChatSession) => !!s.scope || s.highIntent || s.wantsService;

export function diagnosisSteps(intent: Intent | null): FlowStep[] {
  switch (intent) {
    case "AC_REPAIR":
      return [
        {
          id: "ac-running",
          prompt: () => "Got it. Is the system running but blowing warm air, or is it not turning on at all?",
          options: [
            { id: "running_warm", label: "Running but warm", apply: { systemStatus: "running_warm" } },
            { id: "wont_turn_on", label: "Won't turn on", apply: { systemStatus: "off" } },
            { id: "not_sure", label: "Not sure", apply: { systemStatus: "unsure" } },
          ],
          skipIf: skipIfKnownStatus,
        },
        {
          id: "ac-scope",
          prompt: () => "Is this happening throughout the home or mainly in one area?",
          options: [
            { id: "whole_home", label: "Throughout the home", apply: { scope: "whole" } },
            { id: "one_area", label: "One area", apply: { scope: "one" } },
            { id: "not_sure", label: "Not sure", apply: { scope: "unsure" } },
          ],
          skipIf: skipIfKnownScope,
        },
      ];
    case "FURNACE_REPAIR":
    case "HEATING_REPAIR":
      return [
        {
          id: "heat-on",
          prompt: () => "Is it turning on?",
          options: [
            { id: "turning_on", label: "Yes, it turns on", apply: { systemStatus: "running_ok" } },
            { id: "not_turning_on", label: "No", apply: { systemStatus: "off" } },
            { id: "not_sure", label: "Not sure", apply: { systemStatus: "unsure" } },
          ],
          pending: { yes: { systemStatus: "running_ok" }, no: { systemStatus: "off" } },
          skipIf: skipIfKnownStatus,
        },
      ];
    case "HEAT_PUMP_REPAIR":
      return [
        {
          id: "hp-mode",
          prompt: () => "Is the trouble with heating, cooling, or both?",
          options: [
            { id: "heating_problem", label: "Heating", apply: { problem: "Heat pump heating issue" } },
            { id: "ac_problem", label: "Cooling", apply: { problem: "Heat pump cooling issue" } },
            { id: "hvac_repair", label: "Both", apply: { problem: "Heat pump both modes" } },
          ],
          skipIf: (s) => /heating|cooling|both/i.test(s.problem || "") || s.highIntent || s.wantsService,
        },
      ];
    case "HVAC_REPAIR":
      return [
        {
          id: "hvac-which",
          prompt: () => "Is this a cooling problem, a heating problem, or the whole system?",
          options: [
            { id: "ac_problem", label: "Cooling", apply: { intent: "AC_REPAIR", equipment: "ac" } },
            { id: "heating_problem", label: "Heating", apply: { intent: "HEATING_REPAIR", equipment: "furnace" } },
            { id: "hvac_repair", label: "Whole system", apply: { equipment: "hvac" } },
          ],
          skipIf: (s) => s.equipment === "ac" || s.equipment === "furnace" || s.highIntent,
        },
      ];
    case "HVAC_REPLACEMENT":
      return [
        {
          id: "replace-which",
          prompt: () => "Are you looking at cooling, heating, or a full HVAC system?",
          options: [
            { id: "install_ac", label: "New AC", apply: { intent: "AC_INSTALLATION", equipment: "ac", wantsService: true } },
            { id: "install_furnace", label: "New furnace", apply: { intent: "FURNACE_INSTALLATION", equipment: "furnace", wantsService: true } },
            { id: "hp_install", label: "Heat pump", apply: { intent: "HEAT_PUMP_INSTALLATION", equipment: "heat_pump", wantsService: true } },
            { id: "install_full", label: "Full system", apply: { intent: "HVAC_REPLACEMENT", wantsService: true } },
          ],
          skipIf: (s) =>
            s.intent === "AC_INSTALLATION" ||
            s.intent === "FURNACE_INSTALLATION" ||
            s.intent === "HEAT_PUMP_INSTALLATION" ||
            s.highIntent,
        },
      ];
    default:
      return [];
  }
}

export function nextStep(session: ChatSession): FlowStep | null {
  const steps = diagnosisSteps(session.intent);
  for (const step of steps) {
    if (session.asked.includes(step.id)) continue;
    if (step.skipIf(session)) continue;
    return step;
  }
  return null;
}
