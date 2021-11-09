import { FC } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { CookieConsentStatus } from "src/interfaces/cookieConsent";

interface Props {
  onSave: (consentValue: CookieConsentStatus) => void;
}

const CookieConsentBanner: FC<Props> = ({ onSave }) => {
  return (
    <Box pos="fixed" bottom="0" left="0" right="0" data-testid="cookie-banner">
      <Heading size="lg"></Heading>
    </Box>
  );
};

export default CookieConsentBanner;
