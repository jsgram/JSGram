import React from 'react';
import { connect } from 'react-redux';
import * as newsFeedAction from '../../store/newsFeed/actions';
import { FeedPost } from '../../components/FeedPost';

interface ILocalProps {
    newsFeed: [];
    loggedId: string;
    loggedUsername: string;
    loggedPhotoPath: string;
}

interface IState {
    newsFeed: [];
    feed: ILocalProps;
}

interface IProps {
    getNewsFeedAsync: () => void;
    getMoreNewsFeedAsync: (page: number) => void;
    addNextFeedPosts: (page: number) => void;
}

type FeedProps = ILocalProps & IProps;

const FeedContainer = ({
                           loggedId,
                           loggedUsername,
                           loggedPhotoPath,
                           newsFeed,
                           getNewsFeedAsync, getMoreNewsFeedAsync, addNextFeedPosts,
                       }: FeedProps): JSX.Element => {
    return (
        <FeedPost
            loggedId={loggedId}
            loggedUsername={loggedUsername}
            loggedPhotoPath={loggedPhotoPath}
            newsFeed={newsFeed}
            getNewsFeedAsync={getNewsFeedAsync}
            addNextFeedPosts={addNextFeedPosts}
            getMoreNewsFeedAsync={getMoreNewsFeedAsync}
        />
    );
};

const mapStateToProps = (state: IState): ILocalProps => ({
    newsFeed: state.newsFeed,
    loggedId: state.feed.loggedId,
    loggedUsername: state.feed.loggedUsername,
    loggedPhotoPath: state.feed.loggedPhotoPath,
});

const mapDispatchToProps = {
    getNewsFeedAsync: newsFeedAction.getNewsFeedAsync,
    getMoreNewsFeedAsync: newsFeedAction.getMoreNewsFeedAsync,
    addNextFeedPosts: newsFeedAction.addNextFeedPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
