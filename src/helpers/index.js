const getToken = () => JSON.parse(localStorage.getItem('token'));
const setToken = (token) => localStorage.setItem('token', JSON.stringify(token));
const deleteToken = () => localStorage.clear();

export {
    getToken,
    setToken,
    deleteToken
}
