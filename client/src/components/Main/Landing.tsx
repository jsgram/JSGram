import React from "react";
import { Container, Row, Col } from 'reactstrap';
import '../styles/style.scss';
import RegisterContainer from "../Register/RegisterContainer";

export const Main = () => (
    <Container>
        <Row>
            <Col lg="6" md="6" className="d-sm-none d-none d-md-block">
                <div className="main-phone"></div>
            </Col>
            <Col lg="5" md="6">
                <RegisterContainer />
            </Col>
        </Row>
    </Container>
)