import React from 'react';
import { Input } from 'reactstrap';

export default class PostPhoto extends React.Component<any> {
    public onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.props.setDescriptionForPost(event.target.value);
    }
    public render(): JSX.Element {
        const {croppedImage, description}: any = this.props;
        return (
            // TODO Move style to scss
            <div className='row d-flex pt-10 justify-content-lg-center
                justify-content-sm-around justify-content-center'>
                <div style={{height: '30em', width: '30em'}}>
                    <img style={{height: '100%', width: '100%'}} src={croppedImage} alt=''/>
                </div>
                <Input
                    type='textarea'
                    name='description'
                    placeholder='Write a caption...'
                    spellCheck={false}
                    value={description}
                    onChange={this.onDescriptionChange}
                />
            </div>
        );
    }
}
