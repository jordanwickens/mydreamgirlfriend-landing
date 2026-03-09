interface Window {
  posthog?: {
    capture: (event: string, properties?: Record<string, string>) => void;
  };
}
