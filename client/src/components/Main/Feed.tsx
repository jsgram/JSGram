import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

interface IProps {
    loggedUsername: string;
}

export const Feed = ({loggedUsername}: IProps): JSX.Element => {
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
};
