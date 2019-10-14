import React, { ReactElement } from 'react';
import {
    Card, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle, Row, Col, Container,
} from 'reactstrap';
import '../AboutUs/style.scss';
import { our_team } from './data.members';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

export const AboutUs = (): ReactElement => (
    <Container className='header-menu'>
        <div className='text-center w-100'>
            <Link to='/'>
                <img src={logo}
                     alt='logo'
                     width={110}
                     className='pt-1 logo'/>
            </Link>
        </div>
        <Row>
            {our_team.map((team: any) => (
                    <Col key={team.id} lg='4' sm='6' className='mt-4 d-flex'>
                        <Card className='shadow-card d-inline-block'>
                            <CardBody>
                                <CardTitle className='font-weight-bolder'>{team.username}</CardTitle>
                                <CardSubtitle>Some information</CardSubtitle>
                            </CardBody>
                            <img
                                src={team.image}
                                height={300}
                                className='w-100 px-2 photoTeam'
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
