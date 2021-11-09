declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

let isInitialized = false;

export const initGA = () => {
  if (process.browser && !isInitialized) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_}`;
    document.body.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };

    isInitialized = true;
  }
};

export const viewContent = (url: string) => {
  if (process.browser && isInitialized) {
    gtag("event", "ViewContent", { url });
  }
};
