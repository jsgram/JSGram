import React, { ReactElement } from 'react';
import './style.scss';

const footerLink = [
    {id: 1, label: 'About us', href: '#'},
    {id: 2, label: 'Github', href: '#'},
    {id: 3, label: 'Demos', href: '#'},
    {id: 4, label: 'Softserve', href: '#'},
];

export const Footer = (): ReactElement => (
    <div className='page-footer footer mt-3'>
        <ul className='footer-link'>
            {
                footerLink.map((footer: { id: number, href: string, label: string }) => (
                    <li key={footer.id}>
                        <a className='pr-2 text-danger' href={footer.href}>{footer.label}</a>
                    </li>))
            }
        </ul>
        <span>© 2019 JSgram</span>
    </div>
);
