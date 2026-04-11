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
}

export const EditorContext = createContext<EditorContextValue>({
  isEditing: false,
  media: { heroImage: "", storyImage: "" },
  rsvpFields: [],
  scrollY: 0,
});

export function useEditor() {
  return useContext(EditorContext);
}
