import { useState } from "react";
import Cookies from "js-cookie";

const useCookies = (
  cookieName: string
): [
  string,
  (val: string, options?: Cookies.CookieAttributes) => void,
  () => void
] => {
  const getCookieValue = () => {
    return Cookies.get(cookieName);
  };

  const setCookieValue = (value, options: Cookies.CookieAttributes) => {
    Cookies.set(cookieName, JSON.stringify(value), options);
    setCookieValueState(value);
  };

  const [cookie, setCookieValueState] = useState<string>(getCookieValue());

  const removeCookie = () => {
    Cookies.remove(cookieName);
    setCookieValueState(null);
  };

  return [cookie, setCookieValue, removeCookie];
};

export default useCookies;
