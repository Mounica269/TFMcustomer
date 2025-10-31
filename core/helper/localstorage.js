export const getAuthUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

export const setAuthUser = (user) => {
    setAuthToken(user.token);
    setAuthRefreshToken(user.refreshToken);
    localStorage.setItem('user', JSON.stringify(user));
    return true
};

export const removeAuthuser = () => {
    removeAuthToken();
    removeAuthRefreshToken();
    return localStorage.removeItem('user');
}

export const getAuthToken = () => {
    const token = localStorage.getItem('token');
    return token ? token : ''
};

export const setAuthToken = (token) => {
    return localStorage.setItem('token', token);
};

export const removeAuthToken = () => {
    return localStorage.removeItem('token')
};

export const getAuthRefreshToken = () => {
    const refreshToken = localStorage.getItem('refreshToken');
    return refreshToken ? refreshToken : ''
};

export const setAuthRefreshToken = (refreshToken) => {
    return localStorage.setItem('refreshToken', refreshToken);
};

export const removeAuthRefreshToken = () => {
    return localStorage.removeItem('refreshToken')
};

export const setCommonData = (commonData) => {
    return localStorage.setItem("commonData", JSON.stringify(commonData));
};

export const getCommonData = () => {
    return JSON.parse(localStorage.getItem("commonData"));
};
