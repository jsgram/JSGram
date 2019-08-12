import React, {ReactElement} from 'react';
import '../styles/Footer.scss';

const footerLink = [
  { id: 1, label: 'About us', href: '#' },
  { id: 2, label: 'Github', href: '#' },
  { id: 3, label: 'Demos', href: '#' },
  { id: 4, label: 'Softserve', href: '#' },
];

export const Footer: React.FC = (): ReactElement => (
  <div className='page-footer footer'>
    <ul className='footer-link'>
      {
        footerLink.map((footer: {id: number, href: string, label: string}) => (
          <li key={footer.id}>
            <a className='pr-3 text-danger' href={footer.href}>{footer.label}</a>
          </li>))
      }
    </ul>
    <span className='pl-4'>© 2019 JSgram</span>
  </div>
);
