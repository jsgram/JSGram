import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React from 'react';
import Cropper from '../Cropper/Cropper';

interface IModalState {
    modal: boolean;
}
interface IInitialModalState {
    initialModalState: boolean;
}

export default class PopUpModal extends React.Component<IInitialModalState, IModalState> {
    constructor(props: IInitialModalState) {
        super(props);
        this.state = {
            modal: props.initialModalState,
        };

        this.toggle = this.toggle.bind(this);
    }

    public toggle(): void {
        this.setState({
            modal: !this.state.modal,
        });
    }

    public render(): JSX.Element {
        return (
          <div>
            <Modal isOpen={this.state.modal} toggle={this.toggle} >
              <ModalHeader toggle={this.toggle}>Change Profile Photo</ModalHeader>
              <ModalBody>
                <Cropper/>
              </ModalBody>
              <ModalFooter>
                <Button color='secondary' onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </div>
        );
    }
}
