export type Theme = 'system' | 'light' | 'dark' | 'none';

export type renderTypes = {
  baseUrl?: string;
  disableUrlIndex?: true;
  isBackend: boolean;
  theme?: Theme;
};
