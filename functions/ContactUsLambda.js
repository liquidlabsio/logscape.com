var AWS = require('aws-sdk')
var ses = new AWS.SES()

var RECEIVER = 'contact@liquidlabs.com'
var SENDER = 'contact@liquidlabs.com'

exports.handler = function (event, context) {
    console.log('Received event:', event)
    sendEmail(event, function (err, data) {
        context.done(err, null)
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
    ses.sendEmail(params, done)
}