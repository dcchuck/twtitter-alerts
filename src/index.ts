const Twitter = require('twitter');
const twilio = require('twilio');

const twilioCredentials = {
    accountSID: process.env.TWILIO_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN
};

const twilioClient = twilio(twilioCredentials.accountSID, twilioCredentials.authToken);

const twitterCredentials = {
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
};

const twitterClient = new Twitter(twitterCredentials);

let twitterStream = twitterClient.stream('user');

twitterStream.on('data', (event: any) => {
    console.log(event);
    const twitterEvent = new TwitterEvent(event);
    if (twitterEvent.isValidTweet()) {
        processTweet(twitterEvent);
    }
});

twitterStream.on('error', (error: any) => {
    console.log(error);
});

class TwitterEvent {
    public event: any;
    constructor(event: object) {
        this.event = event;
    }

    public isValidTweet() {
        return this.event.hasOwnProperty('user') && this.event.hasOwnProperty('text');
    }

    get tweetText(): string {
        if (this.isValidTweet()) {
            return this.event.text;
        } else {
            return 'Not a tweet';
        }
    }
}

function processTweet(tweet: TwitterEvent) {
    console.log(tweet);
    twilioClient.messages.create({
        to: process.env.TO_NUMBER,
        from: process.env.TWILIO_NUMBER,
        body: tweet.tweetText
    });
}
