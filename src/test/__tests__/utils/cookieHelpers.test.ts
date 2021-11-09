import { getCookieValue } from "@/utils/cookieHelpers";

describe("CookieHelpers tests", () => {
  const FBP_VALUE = "fb.1.1632316057494.1912170900";
  const FBC_VALUE = "fb.1.1632316057494.1912170900";

  beforeAll(() => {
    jest
      .spyOn(document, "cookie", "get")
      .mockReturnValue(`_fbp=${FBP_VALUE}; _fbc=${FBC_VALUE}`);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should return a cookie value for the provided cookie name if exists", () => {
    const fbp = getCookieValue("_fbp");
    expect(fbp).toEqual(FBP_VALUE);

    const fbc = getCookieValue("_fbc");
    expect(fbc).toEqual(FBC_VALUE);
  });

  it("should return empty if cookie doesnt exist", () => {
    const ga = getCookieValue("_ga");
    expect(ga).toEqual("");
  });
});
