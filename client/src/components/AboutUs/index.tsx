import React, { ReactElement } from 'react';
import {
    Card, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle, Row, Col, Container,
} from 'reactstrap';
import '../AboutUs/style.scss';
import { our_team } from './data.members';

export const AboutUs = (): ReactElement => (
            <Container>
                <Row>
                    {our_team.map((team: any) => (
                            <Col lg='4' sm='6' className='mt-4 d-flex'>
                                <Card key={team.id} className='shadow-card d-inline-block'>
                                    <CardBody>
                                        <CardTitle className='font-weight-bolder'>{team.username}</CardTitle>
                                        <CardSubtitle>Some information</CardSubtitle>
                                    </CardBody>
                                    <img
                                        src={team.image}
                                        height={300}
                                        className='w-100 px-2'
                                        alt='user'/>
                                    <CardBody>
                                        <CardText>{team.info}</CardText>
                                        <CardLink href={team.href}>Git link</CardLink>
                                    </CardBody>
                                </Card>
                            </Col>
                        ),
                    )}
                </Row>
            </Container>
);
