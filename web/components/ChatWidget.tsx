import { getChatBoot } from "@/lib/chat/boot";
import { ChatShell } from "./chat/ChatShell";

export function ChatWidget() {
  return <ChatShell boot={getChatBoot()} />;
}
