import { useEffect } from "react";
import { CookieConsentStatus } from "@/interfaces/cookieConsent";
import { initGA } from "@/lib/googleAnalytics";
import useBrowserStorage from "@/hooks/useBrowserStorage";

interface IUseCookieConsent {
  cookieConsent: CookieConsentStatus;
  onCookieConsentChanged: (consentValue: CookieConsentStatus) => void;
}

const useCookieConsent = (): IUseCookieConsent => {
  const [
    storedCookieConsent,
    setStoredCookieConsent,
  ] = useBrowserStorage<CookieConsentStatus>("cookieConsent", "prompt");
  const [
    cookieConsent,
    setCookieConsent,
  ] = useBrowserStorage<CookieConsentStatus>(
    "cookieConsent",
    storedCookieConsent,
    "sessionStorage"
  );

  const shouldInitGA = cookieConsent === "all" || cookieConsent === "analytics";
  const shouldInitFB = cookieConsent === "all" || cookieConsent === "marketing";

  useEffect(() => {
    shouldInitGA && initGA();
  }, [shouldInitGA]);

  const handleChange = (consentValue: CookieConsentStatus) => {
    if (consentValue !== "reject" && consentValue !== "prompt") {
      setStoredCookieConsent(consentValue);
    }
    setCookieConsent(consentValue);
  };

  return { cookieConsent, onCookieConsentChanged: handleChange };
};

export default useCookieConsent;
