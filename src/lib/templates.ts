import { EventInvitationData } from "./types";

export interface TemplateDefinition {
  id: string;
  name: string;
  thumbnail: string;
  description: string;
  defaultData: Partial<EventInvitationData>;
}

export const TEMPLATES: TemplateDefinition[] = [
  {
    id: "classic",
    name: "Classic Baswara",
    thumbnail: "/Design-mock2.png",
    description: "Elegant split-pane layout with fixed side photo.",
    defaultData: {
      theme: {
        primaryColor: "#c17a6f",
        secondaryColor: "#8fad9e",
        tertiaryColor: "#b89a6a",
        backgroundColor: "#faf7f2",
        textColor: "#3a2e2a",
        fontHeading: { family: "'Cormorant Garamond', serif", size: "2.8rem", weight: "400", transform: "none", lineHeight: "1.2", letterSpacing: "0em" },
        fontBody: { family: "'DM Sans', sans-serif", size: "0.9rem", weight: "400", transform: "none", lineHeight: "1.6", letterSpacing: "0.02em" }
      }
    }
  },
  {
    id: "modern",
    name: "Modern Minimal",
    thumbnail: "/next.svg",
    description: "Clean, centered minimalist design with bold typography.",
    defaultData: {
      theme: {
        primaryColor: "#1a1a1a",
        secondaryColor: "#666666",
        tertiaryColor: "#e5e5e5",
        backgroundColor: "#ffffff",
        textColor: "#111111",
        fontHeading: { family: "'DM Sans', sans-serif", size: "3.5rem", weight: "800", transform: "uppercase", lineHeight: "1.1", letterSpacing: "-0.02em" },
        fontBody: { family: "'DM Sans', sans-serif", size: "1rem", weight: "400", transform: "none", lineHeight: "1.6", letterSpacing: "0em" }
      }
    }
  },
  {
    id: "floral",
    name: "Elegant Floral",
    thumbnail: "/file.svg",
    description: "Soft colors and decorative elements for a romantic feel.",
    defaultData: {
      theme: {
        primaryColor: "#8b4a42",
        secondaryColor: "#d4a5a5",
        tertiaryColor: "#e8dcc8",
        backgroundColor: "#fffafb",
        textColor: "#4a3b39",
        fontHeading: { family: "'Great Vibes', cursive", size: "4rem", weight: "400", transform: "none", lineHeight: "1.2", letterSpacing: "0em" },
        fontBody: { family: "'Cormorant Garamond', serif", size: "1.1rem", weight: "400", transform: "none", lineHeight: "1.6", letterSpacing: "0.02em" }
      }
    }
  },
  {
    id: "playful",
    name: "Playful Party",
    thumbnail: "/globe.svg",
    description: "Bright colors and fun typography for lively celebrations.",
    defaultData: {
      theme: {
        primaryColor: "#fd5e4b",
        secondaryColor: "#ffcc00",
        tertiaryColor: "#00c4cc",
        backgroundColor: "#ffffff",
        textColor: "#1a1a1a",
        fontHeading: { family: "'DM Sans', sans-serif", size: "3rem", weight: "900", transform: "none", lineHeight: "1.1", letterSpacing: "-0.03em" },
        fontBody: { family: "'DM Sans', sans-serif", size: "0.95rem", weight: "500", transform: "none", lineHeight: "1.5", letterSpacing: "0.01em" }
      }
    }
  },
  {
    id: "vintage",
    name: "Vintage Charm",
    thumbnail: "/window.svg",
    description: "Classic retro feel with warm tones and textured backgrounds.",
    defaultData: {
      theme: {
        primaryColor: "#5d4037",
        secondaryColor: "#8d6e63",
        tertiaryColor: "#d7ccc8",
        backgroundColor: "#efebe9",
        textColor: "#3e2723",
        fontHeading: { family: "'Cormorant Garamond', serif", size: "3rem", weight: "700", transform: "none", lineHeight: "1.2", letterSpacing: "0.05em" },
        fontBody: { family: "'Cormorant Garamond', serif", size: "1.05rem", weight: "400", transform: "none", lineHeight: "1.6", letterSpacing: "0.03em" }
      }
    }
  }
];
