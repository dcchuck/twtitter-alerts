export default class TwitterEvent {
    public event: any;
    constructor(event: any) {
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

    get tweetUser(): string {
        if (this.isValidTweet()) {
            return this.event.user.screen_name;
        } else {
            return 'Not a tweet';
        }
    }
}
