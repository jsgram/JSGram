import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React from 'react';
import CropperContainer from '../../containers/CropperContainer';

export interface IProps {
    // TODO DON'T USE LOADING! DO WE NEED IT?
    loading: boolean;
    modal: boolean;
    photo: string;
    deletePhoto: () => void;
    toggleModal: () => void;
}

export const PopUpModal = ({modal, photo, deletePhoto: photoDelete, toggleModal}: IProps): JSX.Element => {
    const deletePhoto = (): void => {
        photoDelete();
    };

    return (
        <div>
            <Modal className='text-center' isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Change Profile Photo</ModalHeader>
                <ModalBody>
                    <CropperContainer modalToggle={toggleModal}/>
                    {photo &&
                    <Button className='mt-3' outline size='lg' color='danger' onClick={(): void => {
                        deletePhoto();
                    }}>Delete Current Photo</Button>}
                </ModalBody>
                <ModalFooter>
                    <Button className='m-auto' outline color='secondary' onClick={(): void => {
                        toggleModal();
                    }}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};
