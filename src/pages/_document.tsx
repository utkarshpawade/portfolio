import { Html, Head, Main, NextScript } from "next/document";

/* Applies the saved theme to <html> before first paint to avoid a flash of
   the default (Light) theme on load. Mirrors THEME_STORAGE_KEY / valid ids. */
const themeScript = `(function(){try{var t=localStorage.getItem('portfolio-theme');var valid=['light','dark','midnight','sepia'];if(valid.indexOf(t)===-1)t='light';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;

export default function Document() {
  return (
    <Html lang="en" data-theme="light">
      <Head />
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
