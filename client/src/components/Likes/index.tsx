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
        (<i className='fa fa-heart fa-lg pr-1 like' onClick={onDeleteLike}/>) :
        (<i className='fa fa-heart-o fa-lg pr-1' onClick={onAddLike}/>);

    return (
        <>
            {loadingLike ?
                    <Spinner size='sm'/>
                    :
                    likeButton
            }
            <span>{authorsOfLike.length} likes</span>
        </>
    );
};
