import { atomFamily, atomWithStorage } from "jotai/utils";
import { atom } from "jotai";
import { WidgetScreen } from "@/modules/widget/types";
import { CONTACT_SESSION_KEY } from "@/modules/widget/constants";
import { Id } from "@workspace/backend/_generated/dataModel";

export const screenAtom = atom<WidgetScreen>("loading");

export const organizationIdAtom = atom<string | null>(null);

export const contactSessionIdAtomFamily = atomFamily(
  (organizationId: string) => {
    return atomWithStorage<Id<"contactSessions"> | null>(
      `${CONTACT_SESSION_KEY}_${organizationId}`,
      null
    );
  }
);

export const errorMessageAtom = atom<string | null>(null);

export const loadingMessageAtom = atom<string | null>(null);

export const conversationIdAtom = atom<Id<"conversations"> | null>(null);
