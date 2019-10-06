import React from 'react';
import { connect } from 'react-redux';
import * as newsFeedAction from '../../store/newsFeed/actions';
import { followUser as followUserAction } from '../../store/profile/actions';
import { IFeedState } from '../../store/newsFeed/reducers';
import { PostByTag } from '../../components/PostByTag';

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
    getPostsByTagAsync: (tagName: string) => void;
    getMorePostsByTagAsync: (tagName: string, page: number) => void;
    addNextFeedPosts: (page: number) => void;
    getRecommendations: () => void;
    followUser: (body: { _id: string }) => void;
    match: any;
}

type FeedProps = ILocalProps & IProps;

const PostsByTagContainer = ({
    loggedId,
    loggedUsername,
    loggedPhotoPath,
    newsFeed,
    getPostsByTagAsync,
    getMorePostsByTagAsync,
    addNextFeedPosts,
    getRecommendations,
    followUser,
    match,
}: FeedProps): JSX.Element => {
    return (
        <PostByTag
            loggedId={loggedId}
            loggedUsername={loggedUsername}
            loggedPhotoPath={loggedPhotoPath}
            newsFeed={newsFeed}
            getPostsByTagAsync={getPostsByTagAsync}
            addNextFeedPosts={addNextFeedPosts}
            getMorePostsByTagAsync={getMorePostsByTagAsync}
            getRecommendations={getRecommendations}
            friendsRecommendations={newsFeed.friendsRecommendations}
            followUser={followUser}
            match={match}
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
    getPostsByTagAsync: newsFeedAction.getPostsByTagAsync,
    getMorePostsByTagAsync: newsFeedAction.getMorePostsByTagAsync,
    addNextFeedPosts: newsFeedAction.addNextFeedPosts,
    getRecommendations: newsFeedAction.getRecommendations,
    followUser: followUserAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsByTagContainer);
