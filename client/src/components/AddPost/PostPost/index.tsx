import React from 'react';

export default class PostPhoto extends React.Component<any> {
    public render(): JSX.Element {
        return (
            <div className='row d-flex pt-10 justify-content-lg-center
                justify-content-sm-around justify-content-center'>
                <div style={{height: '30em', width: '30em'}}>
                    <img style={{height: '100%', width: '100%'}} src={this.props.croppedImage} alt=''/>
                </div>
            </div>
        );
    }
}
