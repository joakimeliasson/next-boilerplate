import { renderHook, act } from "@testing-library/react-hooks";
import useBrowserStorage from "@/hooks/useBrowserStorage";

describe("useBrowserStorage tests", () => {
  afterEach(() => {
    window.localStorage.removeItem("test");
    window.sessionStorage.removeItem("test");
  });

  it("should be able to store an item in localStorage", () => {
    const key = "test";
    const value = { test: true };
    renderHook(() => useBrowserStorage(key, value));

    expect(JSON.parse(window.localStorage.getItem(key)!)).toEqual(value);
  });

  it("should be able to store an item in sessionStorage", () => {
    const key = "test";
    const value = { test: true };
    renderHook(() => useBrowserStorage(key, value, "sessionStorage"));

    expect(JSON.parse(window.sessionStorage.getItem(key)!)).toEqual(value);
  });

  it("should update the storage entry when value is changed", () => {
    const key = "test";
    const value = { test: true };
    const newValue = { test: false };
    const { result } = renderHook(() => useBrowserStorage(key, value));

    act(() => result.current[1](newValue));

    expect(JSON.parse(window.localStorage.getItem(key)!)).toEqual(newValue);
  });
});
