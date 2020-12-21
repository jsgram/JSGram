import React from 'react';
import { mapStateToProps } from './index';

describe('FeedContainer component:', () => {
    const mockState = {
        feed: {
            loggedId: 'userid',
            loggedUsername: 'Username',
            loggedPhotoPath: 'loggedPhotoPath',
        },
        newsFeed: {
            newsFeed: 'some',
        },
    };

    test('should return needed props', () => {
        const props = {
            loggedId: 'userid',
            loggedUsername: 'Username',
            loggedPhotoPath: 'loggedPhotoPath',
            newsFeed: {
                newsFeed: 'some',
            },
        };
        expect(mapStateToProps(mockState)).toEqual(props);
    });
});
