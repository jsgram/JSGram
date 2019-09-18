import React from 'react';
import {
    Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Modal, ModalBody, ModalFooter,
} from 'reactstrap';
import './style.scss';
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

    public toggle = (): void => {
        this.setState({
            isMenuOpen: !this.state.isMenuOpen,
        });
    }

    public handleMenuButtonClick = (): void => {
        this.setState({
            modal: !this.state.modal,
        });
    }

    public deletePostHandler = (): void => {
        const {post}: any = this.props;

        this.props.toggleModal(post);
        this.props.deletePost(post._id);
    }

    public cancelDelete = (): void => {
        this.toggle();
        this.handleMenuButtonClick();
    }

    public render(): JSX.Element {
        return (
                <Dropdown isOpen={this.state.isMenuOpen} toggle={this.toggle} color='light'>
                    <DropdownToggle tag='a' className='nav-link'>
                        <i className='fa fa-ellipsis-v fa-lg' />
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem className='text-center edit-post'
                                      onClick={(): any => this.props.toggleEdit(this.props.post)}>Edit</DropdownItem>
                        <DropdownItem divider/>
                        <DropdownItem className='text-center delete-post'
                                      onClick={this.handleMenuButtonClick}>Delete</DropdownItem>
                    </DropdownMenu>
                    <Modal isOpen={this.state.modal} toggle={this.handleMenuButtonClick}
                           className='modal-sm modal-dialog-centered'>
                        <ModalBody className='text-center'>
                            <h2>Delete post?</h2>
                        </ModalBody>
                        <ModalFooter>
                            <Button color='danger' onClick={this.deletePostHandler}>Delete</Button>
                            <Button color='secondary' onClick={this.cancelDelete}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </Dropdown>
        );
    }
}

const mapDispatchToProps = {
    deletePost,
};

export default connect(null, mapDispatchToProps)(MenuPost);
