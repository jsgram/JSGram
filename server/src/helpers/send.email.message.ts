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
        <table width="100%" cellpadding="8" cellspacing="0" style="font-family: Constantia;">
            <thead>
                <td style="vertical-align: top;">
                    <img
                        src="https://is.gd/YJvPQR"
                        alt="JSgram Logo"
                        style="width: 200px;" />
                    <img
                        src="https://wnet.ua/sites/default/files/Softserve-logo-RGB_0.png"
                        alt="SoftServe Logo"
                        style="width: 200px; float: right; margin: 35px 30px 0 0;" />
                </td>
            </thead>
            <tbody align="center">
                <tr>
                    <td style="font-size: 48px; font-weight: 700;">
                        Hi <span style="color: blue;">${username}</span>
                    </td>
                </tr>
                <tr>
                    <td style="font-size: 24px; line-height: 1.5;">
                        We got a request to reset your JSgram password.
                    </td>
                </tr>
                <tr>
                    <td style="font-size: 20px; padding-top: 30px; font-weight: 700;">
                        <a href="${process.env.BACK_PATH}/forgot-password/${token}">Reset Password</a>
                    </td>
                </tr>
                <tr>
                    <td style="font-size: 18px;">
                        If you ignore this message, your password will not be changed.
                        If you didn't request a password reset, <a href="javascript:void(0)">let us know.</a>
                    </td>
                </tr>
            </tbody>
            <tfoot align="center" style="position: absolute; bottom: 0; width: 98%;">
                <td style="font-size: 18px;">
                    <a href="javascript:void(0)" style="text-decoration: none; padding-right: 15px; color: red;">
                        About us
                    </a>
                    <a href="javascript:void(0)" style="text-decoration: none; padding-right: 15px; color: red;">
                        GitHub
                    </a>
                    <a href="javascript:void(0)" style="text-decoration: none; padding-right: 15px; color: red;">
                        Demos
                    </a>
                    <a href="javascript:void(0)" style="text-decoration: none; padding-right: 15px; color: red;">
                        SoftServe
                    </a>
                    <span style="padding-left: 50px;">&copy; JSgram</span>
                </td>
            </tfoot>
        </table>
    `;
};
