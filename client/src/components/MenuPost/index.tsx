import React from 'react';
import './style.scss';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { deletePost } from '../../store/post/actions';
import { connect } from 'react-redux';

interface IState {
    modal?: boolean;
    isMenuOpen?: boolean;
}

interface IProps {
    post: any;
    toggleEdit: (post: any) => void;
    toggleModal: (post: any) => any;
    deletePost: (post: any) => any;
}

class MenuPost extends React.Component<IProps, IState> {
    public state: IState = {
        modal: false,
        isMenuOpen: false,
    };

    public handleMenuButtonClick = (): void => {
        this.setState({ isMenuOpen: !this.state.isMenuOpen });
    }

    public toggle = (): void => {
        this.setState({ modal: !this.state.modal });
    }

    public deletePostHandler = (): void => {
        const { post }: any = this.props;

        this.props.toggleModal(post);
        this.props.deletePost(post._id);
    }

    public cancelDelete = (): void => {
        this.toggle();
        this.handleMenuButtonClick();
    }

    public render(): JSX.Element {
        return (
            <div className='burger-menu pt-1'>
                <div className='dots flex-column m-0' onClick={this.handleMenuButtonClick}>
                    <div>.</div>
                    <div className='mt-1'>.</div>
                    <div className='mt-1'>.</div>
                </div>
                    <nav className={ `menu-navigation float-right ${ this.state.isMenuOpen && 'show-menu' }` }>
                    <ul className='list-unstyled menu-items'>
                        <li className='menu-list'>
                            <button className = 'menu-link d-flex my-2'
                             onClick=  {(): any =>  this.props.toggleEdit(this.props.post)}>Edit</button>
                        </li>
                        <li>
                            <button className = 'menu-link d-flex my-2' onClick={this.toggle}>Delete</button>
                        </li>
                    </ul>
                    </nav>
                <Modal isOpen={this.state.modal} toggle={this.toggle}
                className='modal-sm modal-dialog-centered'>
                    <ModalBody className='text-center'>
                        <h2>Delete post?</h2>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='danger' onClick={this.deletePostHandler}>Delete</Button>
                        <Button color='secondary' onClick={this.cancelDelete}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

const mapDispatchToProps = {
    deletePost,
};

export default connect(null, mapDispatchToProps)(MenuPost);
