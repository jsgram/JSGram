import React from 'react';
import { mapStateToProps } from './index';

describe('SubscribersContainer component:', () => {
    const mockState = {
        profile: {
            user: {
                username: 'username',
            },
        },
        feed: {
            loggedUsername: 'testuser',
            loggedId: 'testuserid',
        },
        subscribers: {
            loggedUsername: 'testuser',
            loggedId: 'testuserid',
            subscribers: [],
            page: 1,
            loaded: true,
            loading: false,
            followersCount: 1,
            followingCount: 1,
            loadFollow: false,
            allSubscribersLoaded: true,
        },
    };

    test('should return needed props', () => {
        const props = {
            loggedUsername: 'testuser',
            loggedId: 'testuserid',
            subscribers: [],
            page: 1,
            loaded: true,
            loading: false,
            followersCount: 1,
            followingCount: 1,
            loadFollow: false,
            allSubscribersLoaded: true,
            user: {
                username: 'username',
            },
        };
        expect(mapStateToProps(mockState)).toEqual(props);
    });
});
