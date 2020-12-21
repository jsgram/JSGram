import React from 'react';
import { connect } from 'react-redux';
import * as newsFeedAction from '../../store/newsFeed/actions';
import { changeUsersFollowing as changeUsersFollowingAction } from '../../store/newsFeed/actions';
import { FeedPost } from '../../components/FeedPost';
import { IFeedState } from '../../store/newsFeed/reducers';

interface ILocalProps {
    newsFeed: IFeedState;
    loggedId: string;
    loggedUsername: string;
    loggedPhotoPath: string;
}

interface IState {
    newsFeed: IFeedState;
    feed: ILocalProps;
}

interface IProps {
    getNewsFeedAsync: () => void;
    getMoreNewsFeedAsync: (page: number) => void;
    addNextFeedPosts: (page: number) => void;
    getRecommendations: () => void;
    changeUsersFollowing: (_id: string, followType: string) => void;
}

type FeedProps = ILocalProps & IProps;

const FeedContainer = ({
    loggedId,
    loggedUsername,
    loggedPhotoPath,
    newsFeed,
    getNewsFeedAsync,
    getMoreNewsFeedAsync,
    addNextFeedPosts,
    getRecommendations,
    changeUsersFollowing,
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
            getRecommendations={getRecommendations}
            friendsRecommendations={newsFeed.friendsRecommendations}
            changeUsersFollowing={changeUsersFollowing}
        />
    );
};

export const mapStateToProps = (state: IState): ILocalProps => ({
    newsFeed: state.newsFeed,
    loggedId: state.feed.loggedId,
    loggedUsername: state.feed.loggedUsername,
    loggedPhotoPath: state.feed.loggedPhotoPath,
});

const mapDispatchToProps = {
    getNewsFeedAsync: newsFeedAction.getNewsFeedAsync,
    getMoreNewsFeedAsync: newsFeedAction.getMoreNewsFeedAsync,
    addNextFeedPosts: newsFeedAction.addNextFeedPosts,
    getRecommendations: newsFeedAction.getRecommendations,
    changeUsersFollowing: changeUsersFollowingAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
