import React from 'react';
<<<<<<< HEAD
import { menuData } from './menu-data';
=======
import {menuData} from './menu-data';
>>>>>>> dev
import { Container, Row } from 'reactstrap';
import './style.scss';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

interface IProps {
    modal?: boolean;
    isMenuOpen?: boolean;
}

export class MenuPost extends React.Component<any> { // FIXME any type
    public state: IProps = {
        modal: false,
        isMenuOpen: false,
    };

    public handleMenuButtonClick = (): void => {
        this.setState({ isMenuOpen: !this.state.isMenuOpen });
<<<<<<< HEAD
    };

    public toggle = (): void => {
        this.setState({ modal: !this.state.modal, });
    };

    public deletePost = (): void => {
        console.log(this);
    };

=======
    }
    public toggle = (): void =>
    this.setState({
        modal: !this.state.modal,
    })
>>>>>>> dev
    public render(): JSX.Element {
        return (
            <div className='burger-menu'>
                <Container className='dots' onClick={this.handleMenuButtonClick}>
                    <Row><div className='mt-1'>.</div></Row>
                    <Row><div className='mt-1'>.</div></Row>
                    <Row><div className='mt-1'>.</div></Row>
                </Container>
<<<<<<< HEAD
                <div>
                    {menuData.length && (
                        <nav className={ `navig ${ this.state.isMenuOpen ? 'show-menu' : ''}` }>
                            <ul className='list-unstyled menu-items'>
                                { menuData.map((item: any) => (
                                    <li className='menu-list' key={item.label}>
                                        <a className = 'menu-link d-flex justify-content-center my-2'
                                        onClick = {item.label === 'Delete' ? this.toggle : undefined}
                                        >{item.label}</a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    )}
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className='modal-xs modal-dialog-centered'>
                        <ModalBody className='text-center'>
                            <h2>Delete post?</h2>
                        </ModalBody>
                        <ModalFooter>
                            <Button color='danger' onClick={this.deletePost}>Delete</Button>
                            <Button color='secondary' onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
=======
            <div>
            {/* TODO Replace undefined in ternary operator with a function for Edit component*/}
                {menuData.length && (
                    <nav className={ `navig ${ this.state.isMenuOpen && 'show-menu' }` }>
                    <ul className='list-unstyled menu-items'>
                        { menuData.map((item: any) => (
                            <li className='menu-list' key={item.label}>
                                <a className = 'menu-link d-flex justify-content-center my-2'
                                onClick = { (item.label === 'Delete') ? this.toggle : undefined }
                                >{item.label}</a>
                            </li>
                        ))}
                    </ul>
                    </nav>
                )}
                <Modal isOpen={this.state.modal} toggle={this.toggle}
                className='modal-sm modal-dialog-centered'>
                    <ModalBody className='text-center'>
                        <h2>Delete post?</h2>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='danger' onClick={this.toggle}>Delete</Button>
                        <Button color='secondary' onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
>>>>>>> dev
            </div>
        );
    }
}
