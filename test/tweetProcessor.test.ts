import TweetProcessor from '../src/tweetProcessor';
import TwitterEvent from '../src/twitterEvent';
import * as assert from 'assert';
import * as sinon from 'sinon';

const seedConfig = {
    places: [
        'The First Place',
        'Place 2 second',
        'place  3'
    ],
    people: [
        'Person 1',
        'Person 2',
        'Person 3'
    ]
};

describe('tweetProcessor', () => {
    it('Calls the handler function for a tweet based on the config', () => {

        const spyHandler = sinon.spy();
        const testTweetProcessor = new TweetProcessor(seedConfig, spyHandler);
        const sendableTweet = new TwitterEvent({
            text: 'The First Place',
            user: {
                screen_name: 'Person 1'
            }
        });

        testTweetProcessor.process(sendableTweet);
        assert(spyHandler.called);
    });
});
