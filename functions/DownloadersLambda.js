var AWS = require('aws-sdk')
var ses = new AWS.SES()

var RECEIVER = 'support@logscape.com'
var SENDER = 'support@logscape.com'


exports.handler = function (event, context) {
    console.log("Download handler received:" + JSON.stringify(event))

    console.log("1111emailing:"  + JSON.stringify(event.email) )

    sendEmail(event, function (err, data) {
        if (err) {
            console.log("FAILED SENDING:" + err);
            context.fail(err);
        } else {

            console.log("SUCCESS SENDING:" + JSON.stringify(data));
            var win64 = "<a target='_blank' href='https://logscape-releases.s3-eu-west-1.amazonaws.com/Logscape-3.12_b0229-x64-setup.msi'> Windows - Logscape-3.12_b0229-x64-setup.msi 188mb</a>";
            var unix =  "<a target='_blank' href='https://logscape-releases.s3-eu-west-1.amazonaws.com/Logscape-3.12_b0229.zip'> Linux.Unix.MacOS - Logscape-3.12_b0229.zip 188mb</a>";

            context.succeed("<br>" + win64 + "<br>" + unix);
        }
    })
    const response = {
        statusCode: 200,
        body: JSON.stringify('REMEMBER TO CHECK YOUR SPAM FOLDER!'),
    };
    return response;
}

function sendEmail (event, done) {

    //console.log("emailing:" +  RECEIVER, "'" + JSON.stringify(event.email) +  "'")
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