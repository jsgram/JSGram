import React from 'react';
import { Spinner } from 'reactstrap';

interface ILikesProps {
    userId: string;
    authorId: string;
    loggedUsername: string;
    postId: string;
    authorsOfLike: [];
    loadingLike: boolean;
    loggedUserLikeExist: boolean;
    addLike: (body: { userId: string, postId: string }) => void;
    deleteLike: (body: { userId: string, postId: string }) => void;
    emitNewNotificationSocket: (userId: string, loggedUsername: string, message: string) => void;
}

export const Likes = ({
                          userId,
                          authorId,
                          loggedUsername,
                          postId,
                          authorsOfLike,
                          loadingLike,
                          loggedUserLikeExist,
                          addLike,
                          deleteLike,
                          emitNewNotificationSocket,
                      }: ILikesProps): JSX.Element => {
    const onAddLike = (): void => {
        addLike({userId, postId});

        emitNewNotificationSocket(authorId, loggedUsername, 'likes your post');
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
