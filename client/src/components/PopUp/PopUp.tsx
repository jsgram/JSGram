import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React from 'react';
import Cropper from '../Cropper/Cropper';

interface IModalState {
    modal: boolean;
}

export default class PopUpModal extends React.Component<any, IModalState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            modal: false,
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
            <Button className="mt-3" color="danger" onClick={this.toggle}>Change Profile Photo</Button>
              <Modal isOpen={this.state.modal} toggle={this.toggle} >
              <ModalHeader toggle={this.toggle}>Change Profile Photo</ModalHeader>
              <ModalBody>
                <Cropper/>
              </ModalBody>
              <ModalFooter>
              <Button color='danger' onClick={() => {
                this.props.deletePhoto();
                this.toggle();}}>Delete Current Photo</Button>
              <Button color='secondary' onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </div>
        );
    }
}
