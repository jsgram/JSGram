import React from 'react';
import { connect } from 'react-redux';
import * as LikeListAction from '../../store/likesList/actions';
import { followUser as followUserAction } from '../../store/profile/actions';
import { LikeList } from '../../components/LikeList';
import { IFeedState } from '../../store/likesList/reducers';
import * as newsFeedAction from '../../store/newsFeed/actions';

interface ILocalProps {
    likeList: IFeedState;
}

interface IState {
    likeList: IFeedState;
    feed: ILocalProps;
    newsFeed: IFeedState;
}

interface IProps {
    getLikeListAsync: () => void;
    getMoreLikeListAsync: (page: number) => void;
    addNextLikeList: (page: number) => void;
    getRecommendations: () => void;
    followUser: (body: { _id: string }) => void;
}

type FeedProps = ILocalProps & IProps;

const LikeListContainer = ({
                               likeList,
                               getLikeListAsync,
                               getMoreLikeListAsync,
                               addNextLikeList,
                           }: FeedProps): JSX.Element => (

    <LikeList
        likeList={likeList}
        getLikeListAsync={getLikeListAsync}
        addNextLikeList={addNextLikeList}
        getMoreLikeListAsync={getMoreLikeListAsync}
        headerText='Posts You have liked:'
    />

);

const mapStateToProps = (state: IState): ILocalProps => ({
    likeList: state.likeList,
});

const mapDispatchToProps = {
    getLikeListAsync: LikeListAction.getLikeListAsync,
    getMoreLikeListAsync: LikeListAction.getMoreLikeListAsync,
    addNextLikeList: LikeListAction.addNextLikeList,
    getRecommendations: newsFeedAction.getRecommendations,
    followUser: followUserAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeListContainer);
