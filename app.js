//Lets require/import the HTTP module
var http = require('http');
var AWS = require('aws-sdk');

AWS.config.update({
    "secretAccessKey": "...",
    "sessionToken": "...",
    "accessKeyId": "...",
    "region": "eu-central-1"
});

var sns = new AWS.SNS();

sns.subscribe({
    Protocol: 'http',
    TopicArn: 'arn:aws:sns:eu-central-1:980592027291:news',
    EndPoint: 'abc.com'
}, function(error, data) {
    console.log(error || data);
})

function createHttpServer() {
    var server = new http.Server();
    server.on( 'request', function( request, response ){
        request.setEncoding( 'utf8' );

        //concatenate POST data
        var msgBody = '';
        request.on( 'data', function( data ){
            msgBody += data;
        });
        request.on( 'end', function(){
            var msgData = parseJSON( msgBody );
            var msgType = request.headers[ 'x-amz-sns-message-type' ];
            handleIncomingMessage( msgType, msgData );
        });

        // SNS doesn't care about our response as long as it comes
        // with a HTTP statuscode of 200
        response.end( 'OK' );
    });

    server.listen( 6001, subscribeToSnS );
}

function handleIncomingMessage( msgType, msgData ) {
    if( msgType === 'SubscriptionConfirmation') {
        //confirm the subscription.
        sns.confirmSubscription({
            Token: msgData.Token,
            TopicArn: msgData.TopicArn
        }, onAwsResponse );
    } else if ( msgType === 'Notification' ) {
        // That's where the actual messages will arrive
    } else {
        console.log( 'Unexpected message type ' + msgType );
    }
}
