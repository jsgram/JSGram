import React from 'react';
import noAvatar from '../../assets/noAvatar.png';

export const comments = [
    {id: 1, image: noAvatar, username: 'Artem', text: 'Artem will implement realisation for comment :)'},
    {id: 2, image: noAvatar, username: 'Yurii', text: 'Artem will implement realisation for comment :)'},
    {id: 3, image: noAvatar, username: 'Ostap', text: 'Artem will implement realisation for comment :)'},
    {id: 4, image: noAvatar, username: 'Rostik', text: 'If you have something advices, dont speak about this)))'},
    {id: 5, image: noAvatar, username: 'Artem', text: 'If you have something advices, dont speak about this)))'},
]

export const Comment = (): JSX.Element => (
    <div className='flex-grow-1 comments border-top position-relative'>
        <div className='position-absolute h-100'>
            { comments.map((comment: any) => (
                <div className='one-comment px-3' key={comment.id}>
                    <img
                        src={comment.image || noAvatar}
                        alt='avatar'
                        width={24}
                        height={24}
                        className='img-fluid rounded-circle mt-1 mr-1 mb-1'
                    />
                    <span className='mt-1'>{comment.username}</span>
                    <div className='d-inline-flex mt-3 float-right edit-delete-comment'>
                        <i className='fa fa-pencil mr-2 edit-comment' />
                        <i className='fa fa-trash-o delete-comment' />
                    </div>
                    <p>{comment.text}</p>
                </div>
            )) }
        </div>
    </div>
)
