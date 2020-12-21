export const changeEmailMessage = (token: string, oldEmail: string, email: string): string => {
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
                    <td style="font-size: 24px; line-height: 1.5;">
                        You requested changing email.
                        <br> To finish changing email, you just need to confirm that we got your email right.
                    </td>
                </tr>
                <tr>
                    <td style="font-size: 20px; padding-top: 30px; font-weight: 700;">
                        <a href=${process.env.BACK_PATH}/profile/confirm/${oldEmail}/${email}/${token}>
                        Click this link and complete your changing email proccess</a>
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
