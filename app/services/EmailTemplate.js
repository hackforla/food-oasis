module.exports = function applyEmailTemplate(emailBody, baseUrl) {
  return ` 
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style type="text/css">
            @media screen and (max-width: 600px) {
                    }
                    @media screen and (max-width: 400px) {
                    }
            </style>
        </head>
        <body style="Margin:0;padding:0;background-color:#ffffff;">
            <div class="email-wrapper" style="width:100%;table-layout:fixed;background-color:#f6f9fc;padding-bottom:40px;">
            <div class="table-wrapper" style="max-width:600px;background-color:#ffffff;Margin-left:auto;Margin-right:auto;border:1px solid #dddddd;border-radius:10px;">
                <table class="outer" style='Margin:0 auto;width:100%;max-width:600px;border-spacing:0;font-family:"Helvetica Neue", Helvetica, sans-serif;color:#4d4d4d;border-bottom: 4px solid #336699;'>
                <tr>
                    <td style="padding:0;">
                    <table width="100%" style="border-spacing:0;">
                        <tr>
                        <td style="padding:0;padding:10px;text-align:center;">
                            <a href="https://foodoasis.la/">
                            <img src="${baseUrl}/FoodOasisLogo.png" alt="Food Oasis Logo" title="Food Oasis Logo" height="55" style="border:0;">
                            </a>
                            <p class="header" style="font-size:20px;line-height:23px;text-align:center;Margin-top:8px !important;Margin-bottom:.25em !important;">
                            Your free food directory
                            </p>
                        </td>
                        </tr>
                    </table>
                    </td>
                </tr>
                </table>
                <table class="outer" style='Margin:0 auto;width:100%;max-width:600px;border-spacing:0;font-family:"Helvetica Neue", Helvetica, sans-serif;color:#4d4d4d;'>
                <tr>
                    <td class="font-body" style="padding:0;font-style:normal;font-weight:normal;font-size:16px;line-height:24px;">
                    <div style="Margin: 0px 50px;">
                    ${emailBody}
                                </div>
                    </td>
                </tr>
                <tr>
                    <td height="15" style="padding:0;background-color: #336699;"></td>
                </tr>
                <tr>
                    <td style="padding:0;background-color: #efefef;">
                    <table width="100%" style="border-spacing:0;border-spacing: 0;">
                        <tr>
                        <td style="padding:0;padding:10px;text-align:center;">
                            <a href="#"><img src="${baseUrl}/icon-spacer-blue.png" alt="Icon Spacer" height="24" style="border:0;"></a>
                            <p style="color:#336699;font-size:16px;font-style:normal;font-weight:500;line-height:24px;Margin:0;padding-top:10px;">Contact Us</p>
                        </td>
                        </tr>
                        <tr>
                        <td class="contact" style="padding:0;font-size:12px;line-height:18px;padding:10px;text-align:center;padding-top:0;">
                            <p style="Margin:0;">
                            Question about our project?
                                                <br>
                            Updates to the listings?
                                                <br>
                            General inquiries?
                                                <br>
                            </p>
                            <p style="margin-bottom: 0;">
                            Please contact our Product Owner, Jenny Mikesell
                                                <br>
                            <a href="mailto:jenny@foodoasis.la">jenny@foodoasis.la</a>
                            </p>
                        </td>
                        </tr>
                    </table>
                    </td>
                </tr>
                <tr>
                    <td height="15" style="padding:0;background-color: #336699;"></td>
                </tr>
                </table>
            </div>
            </div>
        </body>
        </html>
        `;
};
