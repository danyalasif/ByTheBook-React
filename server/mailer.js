import nodemailer from 'nodemailer';

const from = '"By The book" <info@bythebook.com>';

function setup() {
    return nodemailer.createTransport(
        {
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.MAILER_USERNAME, // generated ethereal user
                pass: process.env.MAILER_PASSWORD  // generated ethereal password
            }
        },
        {
            from
        }
    );
}

export function sendConfirmationEmail(user) {
    console.log('Entered Mailer with user ' + user.email);
    const tranport = setup();
    const email = {
        // from,
        to: user.email,
        subject: 'Welcome to By The Book',
        text: `
    Welcome to By The Book. Please, confirm your email.
    ${user.generateConfirmationUrl()}
    `
    };

    // tranport.sendMail(email);

    // send mail with defined transport object
    tranport.sendMail(email, (error, info) => {
        console.log('Entered transporter with user ' + user.email);

        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        nodemailer.getTestMessageUrl(info);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
}
