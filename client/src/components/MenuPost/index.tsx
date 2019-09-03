import React from 'react';
import { menuData } from './menu-data';
import { Container, Row } from 'reactstrap';
import './style.scss';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { deletePost } from '../../store/post/actions';

import { connect } from 'react-redux';

interface IState {
    modal?: boolean;
    isMenuOpen?: boolean;
}

interface IProps {
    togglePost: (post: any) => any;
}

export class MenuPost extends React.Component<IProps, IState> { // FIXME any type
    public state: IState = {
        modal: false,
        isMenuOpen: false,
    };

    public handleMenuButtonClick = (): void => {
        this.setState({ isMenuOpen: !this.state.isMenuOpen });
    };

    public toggle = (): void => {
        this.setState({ modal: !this.state.modal, });
    };

    public deletePostHandler = (): void => {
        console.log(this);
        //this.props.deletePost('cat');
        this.props.togglePost('cat');
    };

    public cancelDelete = (): void => {
        this.toggle();
        this.handleMenuButtonClick();
    };

    public render(): JSX.Element {
        return (
            <div className='burger-menu'>
                <Container className='dots' onClick={this.handleMenuButtonClick}>
                    <Row><div className='mt-1'>.</div></Row>
                    <Row><div className='mt-1'>.</div></Row>
                    <Row><div className='mt-1'>.</div></Row>
                </Container>
                <div>
                {/* TODO Replace undefined in ternary operator with a function for Edit component*/}
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
                            <Button color='danger' onClick={this.deletePostHandler}>Delete</Button>
                            <Button color='secondary' onClick={this.cancelDelete}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = {
    deletePost,
};

export default connect(null, mapDispatchToProps)(MenuPost);
