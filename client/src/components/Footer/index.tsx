import React, { ReactElement } from 'react';
import './style.scss';

const footerLink = [
    {id: 1, label: 'About us', href: '/about-us'},
    {id: 2, label: 'Github', href: 'https://github.com/jsgram/JSGram'},
    {id: 3, label: 'Softserve', href: 'https://career.softserveinc.com/uk-ua/technology'},
];

export const Footer = (): ReactElement => (
    <div className='d-flex justify-content-center footer mt-3'>
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
