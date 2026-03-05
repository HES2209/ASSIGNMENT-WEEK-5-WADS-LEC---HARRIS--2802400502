"use client";

import { useEffect } from 'react';

type SwaggerBundle = {
  presets: {
    apis: unknown;
  };
};

declare global {
  interface Window {
    SwaggerUIBundle?: ((config: Record<string, unknown>) => unknown) & SwaggerBundle;
    ui?: unknown;
  }
}

export default function DocsPage() {
  useEffect(() => {
    const stylesheetId = 'swagger-ui-stylesheet';
    const scriptId = 'swagger-ui-script';

    if (!document.getElementById(stylesheetId)) {
      const link = document.createElement('link');
      link.id = stylesheetId;
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@4/swagger-ui.css';
      document.head.appendChild(link);
    }

    const initSwagger = () => {
      const bundle = window.SwaggerUIBundle;
      if (!bundle) return;

      window.ui = bundle({
        url: '/api/swagger',
        dom_id: '#swagger-ui',
        presets: [bundle.presets.apis],
      });
    };

    const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (existingScript) {
      initSwagger();
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@4/swagger-ui-bundle.js';
    script.async = true;
    script.onload = initSwagger;
    document.body.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, []);

  return <div id="swagger-ui" style={{ minHeight: '100vh' }} />;
}
