import React from 'react';
import { connect } from 'react-redux';
import * as newsFeedAction from '../../store/newsFeed/actions';
import { FeedPost } from '../../components/FeedPost';

// TODO fix any
const FeedContainer = (props: any): JSX.Element => {
    const {
        loggedId,
        loggedUsername,
        loggedPhotoPath,
        newsFeed,
        getNewsFeedAsync, getMoreNewsFeedAsync, addNextFeedPosts,
    }: any = props;
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

const mapStateToProps = (state: any): any => ({
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
