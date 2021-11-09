import { renderHook, act } from "@testing-library/react-hooks";
import useCookieConsent from "@/hooks/useCookieConsent";

describe("useCookieConsent tests", () => {
  afterEach(() => {
    window.localStorage.removeItem("cookieConsent");
    window.sessionStorage.removeItem("cookieConsent");
  });

  it("should default to prompt without initializing any scripts", () => {
    const { result } = renderHook(() => useCookieConsent());
    expect(result.current.cookieConsent).toEqual("prompt");
  });

  it("should change the value when onCookieConsentChanged is called", () => {
    const { result } = renderHook(() => useCookieConsent());

    act(() => result.current.onCookieConsentChanged("reject"));

    expect(result.current.cookieConsent).toEqual("reject");
  });

  it("should mirror the value in sessionStorage and localStorage for marketing ", () => {
    const { result } = renderHook(() => useCookieConsent());

    act(() => result.current.onCookieConsentChanged("marketing"));

    expect(result.current.cookieConsent).toEqual("marketing");
    expect(JSON.parse(window.sessionStorage.getItem("cookieConsent")!)).toEqual(
      "marketing"
    );
    expect(JSON.parse(window.localStorage.getItem("cookieConsent")!)).toEqual(
      "marketing"
    );
  });

  it("should update the localStorage entry if all cookies are selected", () => {
    const { result } = renderHook(() => useCookieConsent());

    act(() => result.current.onCookieConsentChanged("all"));

    expect(result.current.cookieConsent).toEqual("all");
    expect(JSON.parse(window.localStorage.getItem("cookieConsent")!)).toEqual(
      "all"
    );
  });

  it("should show the cookieConsent again if new session and cookies rejected", () => {
    const { result, unmount, rerender } = renderHook(() => useCookieConsent());

    act(() => {
      result.current.onCookieConsentChanged("reject");
      window.sessionStorage.removeItem("cookieConsent");
      unmount();
      rerender();
    });

    expect(result.current.cookieConsent).toEqual("prompt");
  });
});
