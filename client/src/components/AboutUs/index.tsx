import React, { ReactElement } from 'react';
import {
    Card, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle, Row, Col, Container,
} from 'reactstrap';
import noAvatar from '../../assets/noAvatar.png';
import '../AboutUs/style.scss';

const our_team = [
    {
        id: 1,
        href: 'https://github.com/zennarchi',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz5FG9tUw40WJMHOTvhYmJqXhu0mAOjjP_4dzS7Z3bULrLICZL',
        username: 'Artem Pavliuk',
        info: 'Артем Павлюк, developer, в IT вже 5 років, роблю різноманітну роботу, більшість фронт частина, але' +
            ' маю хороший досвід роботи з беком, все скоро роблю, за 1 день -10 багів і навіть не змучився .)',
    },
    {
        id: 2,
        href: 'https://github.com/didOstap',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPyLBOUgCbDaFJ33WoDG0kOv0JNiJOug5I6TN1xnp3d0aOHK7Snw',
        username: 'Ostap Dribniuk',
        info: 'Остап Дрібнюк, в IT недавно, багато помагаю іншим учасникам в тімі, тому що це важливо, успіх залежить' +
            'не від 1 людини, команда-сила. Хороший досвід роботи з беком, дуже хороший, також роблю різні завдання на фронті' +
            ' переважно бізнес логіка',
    },
    {
        id: 3,
        href: 'https://github.com/rostyk1331',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThXhBwo6cqPjlOSjbYhri-vV8bfOSxkohzS_zD9jHPia2AkDlM',
        username: 'Rostyslav Khanas',
        info: 'Ростислав Ханас, в IT з 10 років, працюю як на фронті так на беці, ' +
            'люблю пробувати і робити щось нове, ' +
            'скоренько всьо роблю, потім допогаю тімі',
    },
    {
        id: 4,
        href: 'https://github.com/vglfr',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd_jKaKL5-m9re2poDCzjwCbqK-U62pW-5LDOGsv1Klgv_mh6nrA',
        username: 'Oleksiy Dorozhkin',
        info: 'Олексій Дорожкін, в IT давно, маю хороші і глибокі знання як в теорії так і в практиці, роблю все що треба, ' +
            'також + - хороші знання англійської, командний гравець, добре розраховую час на виконання завдань',
    },
    {
        id: 5,
        href: 'https://github.com/yuriimartynenko',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhL-jHCVQMW9KyY-70hFgaRtQ5B1KAPxu-5ZPhFKZiCmL8y-8q',
        username: 'Yurii Martinenko',
        info: 'Юрій Мартиненко, в IT майже рік, маю хороші знання з фронт розробки, верстаю все що бачу, ' +
            'роути за 2 хв ' +
            'роблю, хороші знання для створення логіки, бек не вчу бо в нас є Остап, командний я!',
    },
    {
        id: 6,
        href: 'https://github.com/IhorKalyta',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPQYYQnEXfwWGMxxDOsgxRMRjQKLy8bYDUZ5_SySy97lrTppZYqg',
        username: 'Ihor Kalyta',
        info: 'Ігор Калита, в ІТ недавно, стараюсь робити все почучуть, більше роблю фронт частину, ' +
            'наполегливий ' +
            'фіксаю добре баги, деколи ноут тупить але то нічо',
    },
    {
        id: 7,
        href: 'https://github.com/Volodia1999',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyM2KE2TQV8tAXchKni2S9vyAgGwg2mh-IRdsFi2ZSLOTVn-Pvqw',
        username: 'Volodia Revura',
        info: 'Я Володя, в IT зовсім не початківець, дуже круто виконую поставлені на себе завдання, ' +
            'тіма для мене дуже багато ' +
            'значить, часто помагаю всім почучуть, роблю ui і деколи бізнес логіку, все взагалі супер :)',
    },
    {
        id: 8,
        image: noAvatar,
        username: 'Marianna Petrivska',
        info: 'Маряна, в ІТ недавно, вчуся важко, викладаюсь на максимум',
    },
];

export const AboutUs = (): ReactElement => (
            <Container>
                <Row>
                    {our_team.map((team: any) => (
                            <Col lg='4' sm='6'>
                                <Card key={team.id} className='mt-4 shadow-card'>
                                    <CardBody>
                                        <CardTitle className='font-weight-bolder'>{team.username}</CardTitle>
                                        <CardSubtitle>Some information</CardSubtitle>
                                    </CardBody>
                                    <img
                                        src={team.image}
                                        width={400}
                                        height={500}
                                        className='img-fluid px-2'
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
)
