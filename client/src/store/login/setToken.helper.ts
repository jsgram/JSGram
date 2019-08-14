export const TOKEN = 'TOKEN';

export const setToken = (token: string): void => {
    localStorage.setItem(TOKEN, token);
};
