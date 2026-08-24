export type ThemeTypes = 'system' | 'light' | 'dark' | 'none';

export type renderTypes = {
  baseUrl?: string;
  disableUrlIndex?: true;
  isBackend: boolean;
  theme: ThemeTypes;
};
