import React from 'react';

interface ILikesProps {
    userId: string;
    postId: string;
    authorsOfLike: [];
    loggedUserLikeExist: boolean;
    addLike: (body: { userId: string, postId: string }) => void;
    deleteLike: (body: { userId: string, postId: string}) => void;
}

export const Likes = ({
                          userId, postId,
                          authorsOfLike, loggedUserLikeExist, addLike, deleteLike,
                      }: ILikesProps): JSX.Element => {
    const onAddLike = (): void => {
        const body = {userId, postId};
        addLike(body);
    };

    const onDeleteLike = (): void => {
        const body = {userId, postId};
        deleteLike(body);
    };

    const likeButton = loggedUserLikeExist ?
        (<i className='fa fa-heart fa-lg pr-1 like' onClick={onDeleteLike}/>) :
        (<i className='fa fa-heart-o fa-lg pr-1' onClick={onAddLike}/>);
    return (
        <>
            {likeButton}
            <span>{authorsOfLike.length} likes</span>
        </>
    );
};
