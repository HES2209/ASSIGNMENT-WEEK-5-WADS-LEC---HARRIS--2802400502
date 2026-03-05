import React from 'react';

export default function DocsPage() {
  return (
    <>
      <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@4/swagger-ui.js"></script>
      <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@4/swagger-ui.css" />
      <div id="swagger-ui"></div>
      <script>
        {`
          window.onload = () => {
            window.ui = SwaggerUIBundle({
              url: '/api/swagger',
              dom_id: '#swagger-ui',
              presets: [
                SwaggerUIBundle.presets.apis,
                SwaggerUIBundle.SwaggerUIStandalonePreset,
              ],
              layout: 'StandaloneLayout',
            });
          };
        `}
      </script>
    </>
  );
}
