import React from 'react';
import '../styles/style.scss';
import {Instagram} from 'react-content-loader';

export default class Profile extends React.Component<any> {
    public componentDidMount(): void {
        this.props.getUser();
    }

    public render(): any {
        const {user: {first_name, last_name, avatar}, loading}: any = this.props;
        if (loading) {
            return (<Instagram/>);
        }
        return (
            <div className='row'>
                <div className='col-3'>
                    <img src={avatar} className='img-fluid' height='150' alt='test'/>
                </div>
                <div className='col-9'>
                    <div className='row'>
                        <h4>{first_name} {last_name}</h4>
                        <div className='btn btn-primary ml-3'>Follow</div>
                    </div>
                    <div className='row'>
                        <div className='row col-8'>
                            <div className='col-4'>300 posts</div>
                            <div className='col-4'>300 followers</div>
                            <div className='col-4'>300 subscribers</div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-8'>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum iusto nesciunt
                                repudiandae vel! Accusamus aliquid animi consequatur, consequuntur cumque dolorem
                                eum eveniet fugit iste labore magni, obcaecati perferendis rerum veniam!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
