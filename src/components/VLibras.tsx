"use client";

import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    VLibras?: {
      Widget: new (config?: {
        rootPath?: string;
        avatar?: string;
        position?: string;
        opacity?: number;
      } | string) => void;
    };
  }
}

declare module "react" {
  interface HTMLAttributes<T> extends React.DOMAttributes<T> {
    vw?: string;
    "vw-access-button"?: string;
    "vw-plugin-wrapper"?: string;
  }
}

export const VLibras: React.FC = () => {
  const initializedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const scriptId = "vlibras-plugin-script";

    const initWidget = () => {
      if (initializedRef.current) return;

      if (window.VLibras && typeof window.VLibras.Widget === "function") {
        try {
          new window.VLibras.Widget({
            rootPath: "https://vlibras.gov.br/app",
            avatar: "icaro",
            position: "R",
          });
          initializedRef.current = true;
        } catch (error) {
          console.error("Erro ao inicializar o VLibras Widget:", error);
        }
      }
    };

    if (window.VLibras) {
      initWidget();
      return;
    }

    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
      script.async = true;
      script.onload = () => {
        setTimeout(initWidget, 100);
      };
      script.onerror = (err) => {
        console.error("Erro ao carregar o script do VLibras:", err);
      };
      document.body.appendChild(script);
    } else {
      const handleLoad = () => {
        setTimeout(initWidget, 100);
      };
      script.addEventListener("load", handleLoad);
    }
  }, []);

  return (
    <div vw="" className="enabled">
      <div vw-access-button="" className="active" />
      <div vw-plugin-wrapper="">
        <div className="vw-plugin-top-wrapper" />
      </div>
    </div>
  );
};
