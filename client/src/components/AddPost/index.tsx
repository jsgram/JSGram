import React from 'react';
import { Container, Row, Col } from 'reactstrap';

export default class AddPost extends React.Component {
    public render(): JSX.Element {
        return (
            <Container>
                <Row>
                    <Col>
                        <h2>Add post</h2>
                    </Col>
                </Row>
            </Container>
        );
    }
}
