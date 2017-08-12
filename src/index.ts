const Twitter = require('twitter');
const twilio = require('twilio');
import TwitterEvent from './twitterEvent';

const twilioCredentials = {
    accountSID: process.env.TWILIO_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN
};

const twitterCredentials = {
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
};

const twitterClient = new Twitter(twitterCredentials);
const twilioClient = twilio(twilioCredentials.accountSID, twilioCredentials.authToken);

const twitterStream = twitterClient.stream('user');

twitterStream.on('data', (event: any) => {
    const twitterEvent = new TwitterEvent(event);
    if (twitterEvent.isValidTweet()) {
        processTweet(twitterEvent);
    }
});

twitterStream.on('error', (error: any) => {
    console.log(error);
});

function processTweet(tweet: TwitterEvent) {
    console.log(tweet);
    twilioClient.messages.create({
        to: process.env.TO_NUMBER,
        from: process.env.TWILIO_NUMBER,
        body: tweet.tweetText
    });
}
