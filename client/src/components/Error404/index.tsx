import React from 'react';
import './style.scss';
import { Link } from 'react-router-dom';

export const Error404 = (): JSX.Element => (
    <div className='pt-5'>
        <div className='text-center justify-content-center pt-5 error-404'>
            <div className='pt-5'>
                Error 404
                <p className='text-error'>Sorry. Page not found </p>
                <Link to='/'><p className='return-home'>Home</p></Link>
            </div>
        </div>
    </div>
);
