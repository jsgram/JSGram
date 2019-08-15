export const createUserMessage = (username: string, token: string): string => {
    return `
        <table width = "100%" cellpadding = "10" cellspacing = "0" style = "font-family: Tahona;">
            <thead>
                <td style="vertical-align: top">
                    <img
                        src="https://is.gd/YJvPQR"
                        alt="JSgram Logo"
                        style="width: 200px;" />
                    <img
                        src="https://wnet.ua/sites/default/files/Softserve-logo-RGB_0.png"
                        alt="SoftServe Logo"
                        style="width: 200px; float: right; margin: 35px 20px 0 0;" />
                </td>
            </thead>
            <tbody align="center">
                <tr>
                    <td style="font-size: 48px; font-weight: 700">
                        Welcome to JSgram <span style="color: blue">${username}</span>
                    </td>
                </tr>
                <tr>
                    <td style="font-size: 24px; line-height: 1.5;">
                        Thanks so much for joining JSgram!
                        <br> To finish signing up, you just need to confirm that we got your email right.
                    </td>
                </tr>
                <tr>
                    <td style="font-size: 20px; padding-top: 30px; font-weight: 700;">
                        <a href=${process.env.BACK_PATH}/confirm/${token}>
                        Click this link and complete your registration</a>
                    </td>
                </tr>
                <tr>
                    <td style="font-size: 18px">
                        This link is available only 1 hour. Hurry up!
                    </td>
                </tr>
            </tbody>
            <tfoot align="center" style="position: absolute; bottom: 0; width: 100%;
                        background-color: black; color: white; margin-left: -16px;">
                <td style="font-size: 18px;">
                    <span>Copyright © 2019 JSgram. All rights reserved.</span>
                </td>
            </tfoot>
        </table>
    `;
};

export const resendTokenMessage = (username: string, token: string): string => {
    return `
        <h1 style="color: lightcoral">
            Hello, ${username} , please verify your account by clicking the
            <a href="${process.env.BACK_PATH}/confirm/${token}"> link</a>
        </h1>
    `;
};

export const forgotPasswordMessage = (username: string, token: string): string => {
    return `
        <h1 style="color: lightcoral">
            Dear, ${username}, please click the <a href="${process.env.BACK_PATH}/forgot-password/${token}">
            link</a> to change your password
        </h1>
    `;
};
