import React from 'react'
import './Footer.css'

class Footer extends React.Component {
    render() {
        return (
            <div className="container-fluid  text-center footer_link footer">
                <a className="pr-3" href = "#">About us</a>
                <a className="pr-3" href = "#">Github</a>
                <a className="pr-3" href = "#">Demos</a>
                <a className="pr-3" href = "#">Softserve</a>
                <span className="pl-4">© 2019 JSgram</span>
            </div>
        )
    }
}

export default Footer
