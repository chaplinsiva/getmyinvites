"use client";

import { createContext, useContext } from "react";

export interface RsvpField {
  id: string;
  type: string;
  label: string;
  required: boolean;
}

export interface EditorMediaState {
  heroImage: string;
  storyImage: string;
}

export interface EditorContextValue {
  isEditing: boolean;
  media: EditorMediaState;
  rsvpFields: RsvpField[];
  scrollY: number;
  /** When false, RSVP block is hidden in preview and for guests after publish */
  showRsvp: boolean;
  /** When false, share dock is hidden in preview and for guests after publish */
  showShare: boolean;
  setShowRsvp: (value: boolean) => void;
  setShowShare: (value: boolean) => void;
}

export const EditorContext = createContext<EditorContextValue>({
  isEditing: false,
  media: { heroImage: "", storyImage: "" },
  rsvpFields: [],
  scrollY: 0,
  showRsvp: true,
  showShare: true,
  setShowRsvp: () => {},
  setShowShare: () => {},
});

export function useEditor() {
  return useContext(EditorContext);
}
