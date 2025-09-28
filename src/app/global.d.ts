export {};

declare global {
  interface Window {
    browser?: {
      i18n?: {
        detectLanguage: (
          text: string,
        ) => Promise<{ languages: { language: string; percentage: number }[] }>;
        getUILanguage: () => string;
      };
    };
  }
}
