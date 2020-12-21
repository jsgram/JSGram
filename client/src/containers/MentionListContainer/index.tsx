import React from 'react';
import { connect } from 'react-redux';
import { followUser as followUserAction } from '../../store/profile/actions';
import { IFeedState } from '../../store/likesList/reducers';
import * as newsFeedAction from '../../store/newsFeed/actions';
import * as mentionListAction from '../../store/mentionList/actions';
import { LikeList } from '../../components/LikeList';

interface ILocalProps {
    mentionList: IFeedState;
}

interface IState {
    mentionList: IFeedState;
    feed: ILocalProps;
    newsFeed: IFeedState;
}

interface IProps {
    getMentionListAsync: () => void;
    getMoreMentionListAsync: (page: number) => void;
    addNextMentionList: (page: number) => void;
    getRecommendations: () => void;
    followUser: (body: { _id: string }) => void;
}

type FeedProps = ILocalProps & IProps;

const MentionListContainer = (
    {
        mentionList,
        getMentionListAsync,
        getMoreMentionListAsync,
        addNextMentionList,
    }: FeedProps,
): JSX.Element => (
    <LikeList
        likeList={mentionList}
        getLikeListAsync={getMentionListAsync}
        addNextLikeList={addNextMentionList}
        getMoreLikeListAsync={getMoreMentionListAsync}
        headerText='Posts where you have been mentioned:'
    />

);

const mapStateToProps = (state: IState): ILocalProps => ({
    mentionList: state.mentionList,
});

const mapDispatchToProps = {
    getMentionListAsync: mentionListAction.getMentionListAsync,
    getMoreMentionListAsync: mentionListAction.getMoreMentionListAsync,
    addNextMentionList: mentionListAction.addNextMentionList,
    getRecommendations: newsFeedAction.getRecommendations,
    followUser: followUserAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(MentionListContainer);
