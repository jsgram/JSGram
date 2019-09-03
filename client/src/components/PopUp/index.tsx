import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import React from 'react';
import CropperContainer from '../../containers/CropperContainer';

interface IProps {
    loading: boolean;
    modal: boolean;
    photo: string;
    deletePhoto: () => void;
    toggleModal: () => void;
}

export default class PopUpModal extends React.Component<IProps> {

    public deletePhoto(): void {
        this.props.deletePhoto();
        this.props.toggleModal();
    }

    public render(): JSX.Element {
        return (
          <div>
              <Modal className='text-center' isOpen={this.props.modal} toggle={this.props.toggleModal} >
              <ModalHeader toggle={this.props.toggleModal}>Change Profile Photo</ModalHeader>
              <ModalBody>
                <CropperContainer modalToggle={this.props.toggleModal}/>
                {this.props.photo && <Button className='mt-3' outline size='lg' color='danger' onClick={(): void => {
                    this.deletePhoto(); }}>Delete Current Photo</Button>}
                </ModalBody>
                <ModalFooter>
                    <Button className='m-auto' outline color='secondary' onClick={(): void => {
                        this.props.toggleModal(); }}>Cancel</Button>
                </ModalFooter>
            </Modal>
          </div>
        );
    }
}
