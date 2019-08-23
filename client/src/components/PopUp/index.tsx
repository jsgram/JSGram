import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React from 'react';
import CropperContainer from '../../containers/CropperContainer';

interface IModalState {
    modal: boolean;
}

interface IProps {
    deletePhoto: () => void;
}

export default class PopUpModal extends React.Component<IProps, IModalState> {
    constructor(props: IProps) {
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
            <Button className='mt-3' color='danger' onClick={this.toggle}>Change Profile Photo</Button>
              <Modal isOpen={this.state.modal} toggle={this.toggle} >
              <ModalHeader toggle={this.toggle}>Change Profile Photo</ModalHeader>
              <ModalBody>
                <CropperContainer modalToggle={this.toggle}/>
                </ModalBody>
                <ModalFooter>
              <Button color='danger' onClick={(): void => {
                  this.props.deletePhoto();
                  this.toggle(); }}>Delete Current Photo</Button>
              <Button color='secondary' onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </div>
        );
    }
}