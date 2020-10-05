const nodemailer = require('nodemailer')
var sgTransport = require("nodemailer-sendgrid-transport")

var options = {
  auth: {
    api_user: process.env.SEND_GRID_USER_NAME,
    api_key: process.env.SEND_GRID_USER_PASSWORD
  },
};

const transporter = nodemailer.createTransport(sgTransport(options))

const sendEmail = async (options) => {
  try {
      console.log(options)
    await transporter.sendMail(options);
    return true;
  } catch (err) {
    console.log("Error:",err);
  }
};

const getDomain = (route) => {
  return `https://mydomain.com/${route}`;
}

const emailBody = (data) => {
  const { email, name, subject, url, type } = data;
  let options = {
    to: email,
    from: process.env.EMAIL_FROM,
    name: name,
    subject,
    // html: registration_email(name)
  }
  if (type === 'reset_password') {
    options.html = forgot_password_email(name, url);
  }
  return options
}

const forgot_password_email = (name, url) => {
  return `
<html>
  <body>
    <div class="contentFit bodyPart">
      <div class="doNotDelete"></div>
      <h1>Forgot Password</h1>
      <div class="content">
        <h3>Dear ${name}, You can update your password using this link</h3>
        ${url}</br>
      </div>
      <div class="team">
        Our best,<br>
        Cudy LMS
      </div>
    </div>
  </body>
</html>
`;
};


const fn =async ()=> { 
    try {

    const email = await emailBody({
        email: 'biswajitdebnath405@gmail.com',
        name: "Biswajit",
        subject: "Reset Password",
        type: "reset_password",
        url: getDomain(`forgot-password/jfbdsjbdsjhgbsdj`)
    });

    const sentEmail = await sendEmail(email);

} catch (e) {
    console.log("Error:",e);
}

}

fn();
