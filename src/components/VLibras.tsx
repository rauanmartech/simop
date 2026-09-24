"use client";

import React, { useEffect } from "react";

declare global {
  interface Window {
    VLibras?: {
      Widget: new (config: {
        rootPath: string;
        avatar?: string;
        position?: string;
        opacity?: number;
      }) => void;
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
  useEffect(() => {
    const scriptId = "vlibras-plugin-script";

    const initWidget = () => {
      if (window.VLibras && typeof window.VLibras.Widget === "function") {
        try {
          new window.VLibras.Widget({
            rootPath: "https://vlibras.gov.br/app",
            avatar: "icaro",
            position: "R",
          });
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
      script.onload = initWidget;
      document.body.appendChild(script);
    } else {
      script.addEventListener("load", initWidget);
    }

    return () => {
      if (script) {
        script.removeEventListener("load", initWidget);
      }
    };
  }, []);

  return (
    <div vw="true" className="enabled">
      <div vw-access-button="true" className="active" />
      <div vw-plugin-wrapper="true">
        <div className="vw-plugin-top-wrapper" />
      </div>
    </div>
  );
};
