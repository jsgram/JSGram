export const setUsername = (username: string) => ({
  type: "REGISTER_USERNAME",
  payload: username
});

export const setFullname = (fullname: string) => ({
  type: "REGISTER_FULLNAME",
  payload: fullname
});

export const setEmail = (email: string) => ({
  type: "REGISTER_EMAIL",
  payload: email
});

export const setPassword = (password: string) => ({
  type: "REGISTER_PASSWORD",
  payload: password
});

export const registerUser = (user: object) => async (dispatch: Function) => {
  const url = "https://jsonplaceholder.typicode.com/posts";
  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(user)
  });
  const data = await response.json();
  dispatch({ type: "REGISTER_USER", payload: data });
};
