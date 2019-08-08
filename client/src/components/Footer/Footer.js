import React from 'react'
import './Footer.scss'

const footerLink = [
  { label: 'About us', href: '#'},
  { label: 'Github', href: '#'},
  { label: 'Demos', href: '#'},
  { label: 'Softserve', href: '#'}
  ]

const Footer = () => (
  <div className="container-fluid text-center footer-link footer">
    {footerLink.map((footer) => (<a className="pr-3 text-danger" href={footer.href}>{footer.label}</a>))}
    <span className="pl-4">© 2019 JSgram</span>
  </div>
)

export default Footer
