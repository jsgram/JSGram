import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserInfoFromToken } from '../../store/feed/actions';

interface IState {
    username: string;
}

interface ILocalState {
    feed: IState;
}

interface IProps {
    username: string;
    getUserInfoFromToken: () => void;
}

class Feed extends React.Component<IProps> {
    public async componentDidMount(): Promise<void> {
        this.props.getUserInfoFromToken();
    }

    public render(): JSX.Element {
        const {username}: IProps = this.props;
        return (
            <Container>
                <Row>
                    <Col>
                        <h2>Welcome</h2>
                        <Link to={`/profile/${username}`} className='text-danger pl-1'>Profile</Link>
                        <Link to='/logout' className='text-danger pl-1'>Logout</Link>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = (state: ILocalState): IState => ({
    username: state.feed.username,
});

const mapDispatchToProps = {
    getUserInfoFromToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
