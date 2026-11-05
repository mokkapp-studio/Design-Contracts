import type { Metadata } from "next";
import type { ReactNode } from "react";
// Tipografías del sistema, servidas desde el proyecto: Inter (pesos de los tokens) y JetBrains Mono.
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/jetbrains-mono/400.css";
import "./tokens.css"; // generado desde tokens/ (npm run tokens)
import "./globals.css";

export const metadata: Metadata = {
  title: "Design Contracts · Xavier Pascual",
  description: "Del prompt a la especificación: un sistema de diseño gobernado por contratos.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
