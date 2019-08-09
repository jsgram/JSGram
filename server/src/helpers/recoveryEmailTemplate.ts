export const generateEmail = (username: string, url: string) => (`
  <table width="100%" cellpadding="8" cellspacing="0" style="font-family: Constantia;">
    <thead>
      <td style="vertical-align: top">
        <img
          src="https://scontent.fiev9-1.fna.fbcdn.net/v/t1.0-9/67803471_649342798898692_1093386776778637312_n.jpg?_nc_cat=110&_nc_oc=AQmy99m2Bn1Ft6Gmn8dfK_GXdp1SEdWxaPjStP0cQ0C0RITIFXczhHUfPZv9UT1qrWE&_nc_ht=scontent.fiev9-1.fna&oh=db72bf62323f628b2060a1c8dcc74900&oe=5DE02342"
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
        <td style="font-size: 48px; font-weight: 700">
          Hi <span style="color: blue">${username}</span>
        </td>
      </tr>
      <tr>
        <td style="font-size: 24px; line-height: 1.5;">
          We got a request to reset your JSgram password.
        </td>
      </tr>
      <tr>
        <td style="font-size: 20px; padding-top: 30px; font-weight: 700;">
          <a href=${url}>Reset Password</a>
        </td>
      </tr>
      <tr>
        <td style="font-size: 18px">
          If you ignore this message, your password will not be changed. If you didn't request a password reset, <a href="javascript:void(0)">let us know.</a>
        </td>
      </tr>
    </tbody>
    <tfoot align="center" style="position: absolute; bottom: 0; width: 98%;">
      <td style="font-size: 18px;">
        <a href="javascript:void(0)" style="text-decoration: none; padding-right: 15px; color: red;">About us</a>
        <a href="javascript:void(0)" style="text-decoration: none; padding-right: 15px; color: red;">GitHub</a>
        <a href="javascript:void(0)" style="text-decoration: none; padding-right: 15px; color: red;">Demos</a>
        <a href="javascript:void(0)" style="text-decoration: none; padding-right: 15px; color: red;">SoftServe</a>
        <span style="padding-left: 50px;">&copy; JSgram</span>
      </td>
    </tfoot>
  </table>
`);
