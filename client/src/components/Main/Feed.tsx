import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

interface IProps {
    loggedUsername: string;
}

export default class Feed extends React.Component<IProps> {
    public render(): JSX.Element {
        const {loggedUsername}: IProps = this.props;
        return (
            <Container>
                <Row>
                    <Col>
                        <h2>Welcome</h2>
                        <Link to={`/profile/${loggedUsername}`} className='text-danger pl-1'>Profile</Link>
                        <Link to='/logout' className='text-danger pl-1'>Logout</Link>
                    </Col>
                </Row>
            </Container>
        );
    }
}
