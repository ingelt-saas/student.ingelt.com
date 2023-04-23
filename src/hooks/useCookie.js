import { useCookies } from "react-cookie";

const useCookie = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    return { cookies, setCookie, removeCookie };
}

export default useCookie;