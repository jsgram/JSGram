import API from '../api';
const TOKEN = 'TOKEN';

export const loginUser = (user: object): () => Promise<void> => async (): Promise<void> => {
    try {
        const res = await API.post('/auth/login', user);
        localStorage.setItem(TOKEN, res.data.token);
    } catch (e) {
        console.error(e.message);
    }
};
