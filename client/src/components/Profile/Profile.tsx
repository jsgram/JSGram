import React from 'react';
import '../styles/style.scss';
import { Instagram } from 'react-content-loader';

export interface IUserData {
    first_name: string;
    last_name: string;
    avatar: string;
}

interface IFormProps {
    getUser: () => void;
    user: IUserData;
    loaded: boolean;
}

export default class Profile extends React.Component<IFormProps> {

    public state: {loaded: boolean} = {
        loaded: false,
    };
    public timerHandle: any = 0;

    public componentDidMount(): void {
        this.props.getUser();

    }
    public componentDidUpdate(prevProps: any): void {
        if (prevProps.loaded !== this.props.loaded && this.props.loaded) {
            this.timerHandle = setTimeout(() => {
                this.setState({loaded: true});
                this.timerHandle = 0;
            },
                3000,
            );
        }
    }
    public componentWillUnmount(): void {
        clearTimeout(this.timerHandle);
        this.timerHandle = 0;
    }

    public render(): JSX.Element {
        const { user: {first_name, last_name, avatar} }: any = this.props;
        const { loaded }: {loaded: boolean} = this.state;

        if (!loaded) {
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
