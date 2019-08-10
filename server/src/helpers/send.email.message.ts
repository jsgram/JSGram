export const createUserMessage = (username: string, url: string): string => {
    return `<h1 style="color: lightcoral">
Congratulation, ${username}, click the
<a href="${url}">link</a> to verify your account</h1>`;
};

export const resendTokenMessage = (username: string, url: string): string => {
    return `<h1 style="color: lightcoral">
Hello, ${username} , please verify your account by clicking the
<a href="${url}"> link</a></h1>`;
};

export const forgotPasswordMessage = (username: string, url: string): string => {
    return `<h1 style="color: lightcoral">
Dear, ${username}, please click the
<a href="${url}">link</a> to change your password</h1>`;
};
