import React from 'react';
import { Spinner } from 'reactstrap';

interface ILikesProps {
    userId: string;
    postId: string;
    authorsOfLike: [];
    loadingLike: boolean;
    loggedUserLikeExist: boolean;
    addLike: (body: { userId: string, postId: string }) => void;
    deleteLike: (body: { userId: string, postId: string }) => void;
}

export const Likes = ({userId, postId, authorsOfLike, loadingLike, loggedUserLikeExist, addLike, deleteLike}:
                          ILikesProps): JSX.Element => {
    const onAddLike = (): void => {
        addLike({userId, postId});
    };

    const onDeleteLike = (): void => {
        deleteLike({userId, postId});
    };

    const likeButton = loggedUserLikeExist ?
        (<i className='fa fa-heart fa-lg like' onClick={onDeleteLike}/>) :
        (<i className='fa fa-heart-o fa-lg' onClick={onAddLike}/>);

    return (
        <>
            <div className='likes'>
                {loadingLike ?
                        <Spinner type='grow' size='sm'/>
                        :
                        likeButton
                }
            </div>
            <span>{authorsOfLike.length} likes</span>
        </>
    );
};
