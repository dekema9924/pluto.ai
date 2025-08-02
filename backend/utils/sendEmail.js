const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text, actionUrl, name) => {


    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.GOOGLE_USER,
            pass: process.env.GOOGLE_APP_PASSWORD,
        },
    });

    // Wrap in an async IIFE so we can use await.
    (async () => {
        const info = await transporter.sendMail({
            from: `"pluto.ai" <${process.env.GOOGLE_USER}>`,
            to: email,
            subject: subject,
            text: text,
            html: `

                <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email from Pluto.ai</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        background-color: #ffffff;
        max-width: 600px;
        margin: 40px auto;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      }
      .header {
        font-size: 24px;
        font-weight: bold;
        color: #333333;
        margin-bottom: 20px;
      }
      .message {
        font-size: 16px;
        color: #555555;
        line-height: 1.6;
      }
      .footer {
        margin-top: 30px;
        font-size: 12px;
        color: #aaaaaa;
        text-align: center;
      }
      .btn {
        display: inline-block;
        margin-top: 20px;
        padding: 12px 24px;
        background-color: #0072ff;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">Welcome to Pluto.ai 🚀</div>
      <div class="message">
        <p>Hello ${name || 'there'},</p>
        <p>${text || 'We’re excited to have you here. Please complete your verification below:'}</p>

        ${actionUrl ? `<a href="${actionUrl}" class="btn">Verify Now</a>` : ''}

        <p>If you didn’t request this, you can safely ignore this email.</p>
      </div>
      <div class="footer">
        &copy; ${new Date().getFullYear()} Pluto.ai — All rights reserved.
      </div>
    </div>
  </body>
  </html>
            `
        });

        console.log("Message sent:", info.messageId);
    })();
}


module.exports = sendEmail