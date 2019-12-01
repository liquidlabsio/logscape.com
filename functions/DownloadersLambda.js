var AWS = require('aws-sdk')
var ses = new AWS.SES()

var RECEIVER = 'support@logscape.com'
var SENDER = 'support@logscape.com'

// need to enable CORS for testing

exports.handler = function (event, context) {
    console.log("Download handler received:" + JSON.stringify(event))
    sendEmail(event, function (err, data) {

        console.log("finished sending email....")
        if (err) {
            console.log("FAILED SENDING:" + err);
            context.fail(err);
        } else {

            console.log("SUCCESS SENDING:" + JSON.stringify(data));
            context.succeed(event);
        }
    })
    const response = {
        statusCode: 200,
        body: JSON.stringify('REMEMBER TO CHECK YOUR SPAM FOLDER!'),
    };
    return response;
}
//  var data = {
//         name: $('#name-input').val(),
//         email: $('#email-input').val(),
//       + "\nRole: " + JSON.stringify(event.role)
//         company: $('#company-input').val(),
//         country: $('#country-input').val(),
//         ip: $('#ip-input').val(),
//         reason: $('#reason-input').val(),
//     }
function sendEmail (event, done) {
    var params = {
        Destination: {
            ToAddresses: [
                RECEIVER
            ]
        },
        Message: {
            Body: {
                Text: {
                    Data: "From: " + JSON.stringify(event.name) + "\nEmail: " + JSON.stringify(event.email)
                    +  "\nCompany: " + JSON.stringify(event.company) +  "\nRole: " + JSON.stringify(event.role)
                    + "\nCountry: " + JSON.stringify(event.country) + "\nIP: " + JSON.stringify(event.ip)
                    + "\nReason: " + JSON.stringify(event.reason),
                    Charset: 'UTF-8'
                }
            },
            Subject: {
                Data: 'Download request from ' + event.email,
                Charset: 'UTF-8'
            }
        },
        Source: SENDER
    }
    ses.sendEmail(params, done)
}