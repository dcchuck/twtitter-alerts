import TweetProcessor from '../src/tweetProcessor';
import TwitterEvent from '../src/twitterEvent';
import * as assert from 'assert';
import * as sinon from 'sinon';

const seedConfig = {
    phrases: [
        'The First Place'
    ],
    people: [
        'Person 1'
    ]
};

const secondConfig = {
    phrases: [
        'The Second Place'
    ],
    people: [
        'Person 2'
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
    it('Matches phrases across any part of a tweet', () => {
        const spyHandler = sinon.spy();
        const testTweetProcessor = new TweetProcessor(seedConfig, spyHandler);
        const sendableTweet = new TwitterEvent({
            text: 'Tonight I will be at the The First Place it is the best',
            user: {
                screen_name: 'Person 1'
            }
        });

        testTweetProcessor.process(sendableTweet);
        assert(spyHandler.called);
    });
    it('Require an exact match of twitter user name', () => {
        const spyHandler = sinon.spy();
        const testTweetProcessor = new TweetProcessor(seedConfig, spyHandler);

        const unsendableWrongPerson = new TwitterEvent({
            text: 'Tonight I will be at the The First Place it is the best',
            user: {
                screen_name: 'Person 11'
            }
        });

        testTweetProcessor.process(unsendableWrongPerson);
        assert(spyHandler.notCalled);
    });
    it('Accepts an array of configs', () => {
        console.log('todo');
        const arrayOfConfigs = [seedConfig, secondConfig];
        const spyHandler = sinon.spy();
        const testTweetProcessor = new TweetProcessor(arrayOfConfigs, spyHandler);

        const unsendableWrongPerson = new TwitterEvent({
            text: 'Tonight I will be at the The First Place it is the best',
            user: {
                screen_name: 'Person 2'
            }
        });

        const sendableTweet = new TwitterEvent({
            text: 'Tonight I will be at the The First Place it is the best',
            user: {
                screen_name: 'Person 1'
            }
        });

        testTweetProcessor.process(unsendableWrongPerson);
        assert(spyHandler.notCalled);
        testTweetProcessor.process(sendableTweet);
        assert(spyHandler.called);
    });
});
