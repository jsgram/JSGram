import React from 'react';
import {menuData} from './menu-data';
import {Container, Row} from 'reactstrap';
import './style.scss';
import { booleanLiteral, JSXElement } from '@babel/types';
export class Post extends React.Component<{}, { isMenuOpen: boolean }> {
    constructor( props: any ) {
        super(props);
        this.state = {
            isMenuOpen: false,
        };
    }
    public handleMenuButtonClick = (): void => {
        this.setState({ isMenuOpen: ! this.state.isMenuOpen });
    }
    public render(): JSX.Element {
        const { isMenuOpen }: { isMenuOpen: boolean }  = this.state;
        return(
        <div className='burger-menu'>
            {/* <i className='fa fa-ellipsis-v'onClick = { this.handleMenuButtonClick }/> */}
                <Container className='dots' onClick={this.handleMenuButtonClick}>
                    <Row><text className='mt-1'>.</text></Row>
                    <Row><text className='mt-1'>.</text></Row>
                    <Row><text className='mt-1'>.</text></Row>
                </Container>
            {menuData.length && (
                <nav className={ `navig ${ isMenuOpen ? 'show-menu' : ''}` }>
                <ul className='list-unstyled menu-items'>
                    { menuData.map((item: any) => (
                        <li className='menu-list' key={item.label}>
                            <a className ='menu-link d-flex justify-content-center my-2'
                            href={item.url}>{item.label}</a>
                        </li>
                    ))}
                </ul>
                </nav>
            )}
        </div>
        );
    }
}
