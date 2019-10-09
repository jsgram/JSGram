import { mapStateToProps } from './index';

import React from 'react';

describe('ProfileSubscriptionsContainer component:', () => {
    const mockState = {
        profile: {
            user: {
                username: 'username',
                subscriptions: {
                    isNewsEmail: false,
                    isReminderEmail: false,
                    isProductEmail: true,
                    isResearchEmail: false,
                    isTextMessage: true,
                },
                privacy: {
                    isPrivateAccount: false,
                    isActivityStatus: false,
                    isStorySharing: true,
                },
            },
        },
    };

    test('should return needed props', () => {
        const props = {
            username: 'username',
            initialValues: {
                isNewsEmail: false,
                isReminderEmail: false,
                isProductEmail: true,
                isResearchEmail: false,
                isTextMessage: true,
            },
            privacy: {
                isPrivateAccount: false,
                isActivityStatus: false,
                isStorySharing: true,
            },
        };
        expect(mapStateToProps(mockState)).toEqual(props);
    });
});
