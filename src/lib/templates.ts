import { WeddingData } from "./types";

export interface TemplateDefinition {
  id: string;
  name: string;
  thumbnail: string;
  description: string;
  defaultData: Partial<WeddingData>;
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
        fontHeading: { family: "'Cormorant Garamond', serif", size: "2.8rem", weight: "400", transform: "none" },
        fontBody: { family: "'DM Sans', sans-serif", size: "0.9rem", weight: "400", transform: "none" }
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
        fontHeading: { family: "'DM Sans', sans-serif", size: "3.5rem", weight: "800", transform: "uppercase" },
        fontBody: { family: "'DM Sans', sans-serif", size: "1rem", weight: "400", transform: "none" }
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
        fontHeading: { family: "'Great Vibes', cursive", size: "4rem", weight: "400", transform: "none" },
        fontBody: { family: "'Cormorant Garamond', serif", size: "1.1rem", weight: "400", transform: "none" }
      }
    }
  }
];
