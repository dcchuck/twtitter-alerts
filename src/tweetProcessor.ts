import TwitterEvent from './twitterEvent';

export interface ConfigurationObject {
    places: Array<string>;
    people: Array<string>;
}

export default class TweetProcessor {
    private config: ConfigurationObject;
    private handler: (tweet: string) => void;

    constructor(config: ConfigurationObject, handler: (tweet: string) => void) {
        this.config = config;
        this.handler = handler;
    }

    private handle(tweet: string) {
        this.handler(tweet);
    }

    public process(tweet: TwitterEvent) {
        if ((this.config.places.includes(tweet.tweetText)) && (this.config.people.includes(tweet.tweetUser))) {
            this.handle(`${tweet.tweetUser}: ${tweet.tweetText}`);
        }
    }
}
