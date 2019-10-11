import { mapStateToProps } from './index';

import React from 'react';

describe('ProfilePrivacyContainer component:', () => {
    const mockState = {
        profile: {
            user: {
                username: 'username',
                subscriptions: {
                    isNewsEmail: false,
                    isReminderEmail: false,
                    isProductEmail: false,
                },
                privacy: {
                    isPrivateAccount: false,
                    isActivityStatus: false,
                    isStorySharing: true,
                },
                finalValues: {},
            },
        },
    };

    test('should return needed props', () => {
        const props = {
            username: 'username',
            subscriptions: {
                isNewsEmail: false,
                isReminderEmail: false,
                isProductEmail: false,
            },
            initialValues: {
                isPrivateAccount: false,
                isActivityStatus: false,
                isStorySharing: true,
            },
            finalValues: {},
        };
        expect(mapStateToProps(mockState)).toEqual(props);
    });
});
