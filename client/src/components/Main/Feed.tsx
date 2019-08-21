import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class Feed extends React.Component<any> {
    public render(): JSX.Element {
        return (
            <Container>
                <Row>
                    <Col>
                        <h2>Welcome</h2>
                        <Link to='/profile' className='text-danger pl-1'>Profile</Link>
                        <Link to='/logout' className='text-danger pl-1'>Logout</Link>
                    </Col>
                </Row>
            </Container>
        );
    }
}
