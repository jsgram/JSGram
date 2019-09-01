import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

interface MyProps{
    modal?: boolean;
}
export class ModalExample extends React.Component<MyProps>{
  
public state: MyProps = {
    modal: false,
};
 
  public toggle=():void =>
    this.setState({
      modal: ! this.state.modal
    });


  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>Button</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className='modal-dial modal-sm modal-dialog-centered'>
          <ModalBody className='text-center'>
            <h2>Delete post?</h2>
          </ModalBody>
          <ModalFooter>
            <Button  color="danger" onClick={this.toggle}>Delete</Button>{' '}
            <Button className='mr-0'color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

