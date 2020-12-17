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
    const token = getToken()
    if (token) {
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
