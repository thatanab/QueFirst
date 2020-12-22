import jwtDecode from 'jwt-decode'

const getToken = () => {
    return localStorage.getItem("ACCESS_TOKEN");
};


const setToken = (token) => {
    localStorage.setItem("ACCESS_TOKEN", token);
};


const clearToken = () => {
    localStorage.clear();
};

const getRole = () => {
    const token = getToken();
    // console.log(payload)
    if (token) {
        const payload = jwtDecode(token);
        if (payload.role === "ADMIN") {
            return "ADMIN";
        }
        return "USER";
    };
    return "GUEST";
};

const allLocal = {
    getToken,
    setToken,
    clearToken,
    getRole
}

export default allLocal;
