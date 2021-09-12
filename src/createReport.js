const sgMail = require('@sendgrid/mail')
const sendReport = (json) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    var body = json.map(j => {
        return `
        <strong>${j.transTitle}</strong>
        <p>${j.url}</p>
        <br/>
        `
    }).join()
    const msg = {
    to: 'chg3376@kakao.com',
    //from: 'em1614.h-9.info',
    from: 'noreply@h-9.info',
    //from: 'chg3376@gmail.com',
    subject: `Daily Report : ${json.find(e => true).title}`,
    text: json.find(e => true).title,
    html: body,
    }
    sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent')
    })
    .catch((error) => {
        console.error(error)
    })
    return "";
}

export default sendReport