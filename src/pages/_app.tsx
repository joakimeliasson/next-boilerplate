import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { appWithTranslation } from "next-i18next";
import { ChakraProvider } from "@chakra-ui/react";
import useCookieConsent from "@/hooks/useCookieConsent";
import { viewContent } from "@/lib/googleAnalytics";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import { theme } from "../theme";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { cookieConsent, onCookieConsentChanged } = useCookieConsent();
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (cookieConsent === "all" || cookieConsent === "analytics") {
        viewContent(url);
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events, cookieConsent]);

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
      {cookieConsent === "prompt" && (
        <CookieConsentBanner
          onSave={(consentValue) => onCookieConsentChanged(consentValue)}
        />
      )}
    </ChakraProvider>
  );
};

export default appWithTranslation(MyApp);
