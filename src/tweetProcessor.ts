import TwitterEvent from './twitterEvent';

export interface ConfigurationObject {
    phrases: Array<string>;
    people: Array<string>;
}

export default class TweetProcessor {
    private config: Array<ConfigurationObject>;
    private handler: (tweet: string) => void;

    constructor(config: ConfigurationObject | Array<ConfigurationObject>, handler: (tweet: string) => void) {
        this.config = Array.isArray(config) ? config : [ config ];
        this.handler = handler;
    }

    private handle(tweet: string) {
        this.handler(tweet);
    }

    public process(tweet: TwitterEvent) {
        this.config.forEach(config => {
            let foundPhraseMatch = false;
            config.phrases.forEach(phrase => {
                const phraseRegExp = new RegExp(phrase, 'i');
                if (tweet.tweetText.match(phraseRegExp) !== null) {
                    foundPhraseMatch = true;
                }
            });
            if (foundPhraseMatch && (config.people.includes(tweet.tweetUser))) {
                this.handle(`${tweet.tweetUser}: ${tweet.tweetText}`);
            }
        });
    }
}
