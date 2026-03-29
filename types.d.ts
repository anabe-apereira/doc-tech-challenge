// Type declarations for Docusaurus modules
// These help with TypeScript intellisense before dependencies are installed

declare module '@docusaurus/types' {
  export interface Config {
    title: string;
    tagline: string;
    favicon: string;
    url: string;
    baseUrl: string;
    organizationName: string;
    projectName: string;
    onBrokenLinks: string;
    onBrokenMarkdownLinks: string;
    i18n: {
      defaultLocale: string;
      locales: string[];
    };
    presets: any[];
    themeConfig: any;
  }
}

declare module '@docusaurus/preset-classic' {
  export interface Options {
    docs?: {
      sidebarPath?: string;
      editUrl?: string;
    };
    blog?: {
      showReadingTime?: boolean;
      editUrl?: string;
    };
    theme?: {
      customCss?: string;
    };
  }

  export interface ThemeConfig {
    image?: string;
    navbar?: {
      title: string;
      logo?: {
        alt: string;
        src: string;
      };
      items: any[];
    };
    footer?: {
      style: string;
      links: any[];
      copyright: string;
    };
    prism?: {
      theme?: any;
      darkTheme?: any;
    };
  }
}

declare module 'prism-react-renderer/themes/github' {
  const theme: any;
  export default theme;
}

declare module 'prism-react-renderer/themes/dracula' {
  const theme: any;
  export default theme;
}

declare module './sidebars.js' {
  const sidebars: any;
  export default sidebars;
}

declare module './src/css/custom.css' {
  const css: string;
  export default css;
}

// Node.js globals
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV?: string;
    [key: string]: string | undefined;
  }
}
