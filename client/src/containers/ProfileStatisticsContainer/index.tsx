import React from 'react';
import { connect } from 'react-redux';
import { FormProps } from 'reactstrap';

const prependZeroes = (n: number, digits: number): string => ('0' + n).slice(-digits);

const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);

    const hour = prependZeroes(date.getUTCHours(), 2);
    const minute = prependZeroes(date.getMinutes(), 2);
    const second = prependZeroes(date.getSeconds(), 2);

    return `${hour}:${minute}:${second}`;
};

const ProfileStatisticsContainer = ({ user }: FormProps): JSX.Element => (
    <div>
        <h3 className='text-center font-weight-light text-secondary text-uppercase'>Account Data</h3>
        <div className='d-flex flex-column mt-3 bg-white p-4'>
            <p>Username</p>
            <p className='font-italic text-secondary mb-4'>{user.username}</p>

            <p>Full Name</p>
            <p className='font-italic text-secondary mb-4'>{user.fullName}</p>

            <p>Account Email</p>
            <p className='font-italic text-secondary mb-4'>{user.email}</p>

            <p>Date Joined</p>
            <p className='font-italic text-secondary mb-4'>{new Date(user.createdAt).toLocaleString()}</p>

            <p>Biography</p>
            <p className='font-italic text-secondary mb-4'>{user.description || '-'}</p>

            <p>JSgram Admin</p>
            <p className='font-italic text-secondary mb-4'>{user.isAdmin ? 'Yes' : 'No'}</p>
        </div>

        <h3 className='text-center font-weight-light text-secondary text-uppercase'>Session Info</h3>
        <div className='d-flex flex-column mt-3 bg-white p-4'>
            <p>Last IP Address</p>
            <p className='font-italic text-secondary mb-4'>{user.ipAddress}</p>

            <p>Language</p>
            <p className='font-italic text-secondary mb-4'>{user.language}</p>

            <p>Platform</p>
            <p className='font-italic text-secondary mb-4'>{user.platform}</p>

            <p>Last Session</p>
            <p className='font-italic text-secondary mb-4'>{formatTime(user.lastSession)}</p>

            <p>Last Daily Session</p>
            <p className='font-italic text-secondary mb-4'>{formatTime(user.dailySession)}</p>

            <p>Total Time on Site</p>
            <p className='font-italic text-secondary mb-4'>{formatTime(user.totalSession)}</p>
        </div>
    </div>
);

export const mapStateToProps = (state: FormProps): { user: any } => ({
    user: state.profile.user,
});

export default connect(mapStateToProps)(ProfileStatisticsContainer);
