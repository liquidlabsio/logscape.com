var AWS = require('aws-sdk')
var ses = new AWS.SES({region: 'eu-west-1'});

var RECEIVER = 'support@logscape.com'
var SENDER = 'support@logscape.com'

exports.handler = function (event, context) {
    console.log('Email Sender received event:', event)
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
                    Data: "From: " + event.name + "\nEmail: " + event.email + "\nMsg: " + event.msg,
                    Charset: 'UTF-8'
                }
            },
            Subject: {
                Data: 'Contact via Website from ' + event.email,
                Charset: 'UTF-8'
            }
        },
        Source: SENDER
    }
    console.log("sending email data:"  + JSON.stringify(params))
    ses.sendEmail(params, done)
}