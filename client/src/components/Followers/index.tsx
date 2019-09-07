import React from 'react';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import userphoto from '../../assets/user1.png';
import './style.scss';
interface IState {
    modal?: boolean;
}
export class Followers extends React.Component<IState> {
    public state: IState = {
        modal: false,
    };
    public toggle = (): void => {
        this.setState({ modal: !this.state.modal });
    }
    public render(): JSX.Element {
        return (
            <div>
                <Button color = 'danger' onClick={this.toggle}>Followers</Button>
                <Modal className='modal-dialog-centered' isOpen={this.state.modal}>
                    <ModalHeader toggle={this.toggle} cssModule={{'modal-title': 'w-100 text-center '}}>
                        <p>Followers</p>
                    </ModalHeader>
                    <ModalBody>
                    <div className='d-flex mr-2 justify-content-between mt-3'>
                        <div className='row'>
                        <img
                            src={userphoto}
                            alt='avatar'
                            width={32}
                            height={32}
                            className='img-fluid rounded-circle ml-4 mr-2 mt-1'
                        />
                        <h6 className='align-self-end'>mariasyk_potter</h6>
                        </div>
                        <Button color='danger'>Follow</Button>
                    </div>
                    <div className='d-flex mr-2 justify-content-between mt-3'>
                        <div className='row'>
                        <img
                            src={userphoto}
                            alt='avatar'
                            width={32}
                            height={32}
                            className='img-fluid rounded-circle ml-4 mr-2 mt-1'
                        />
                        <h6 className='align-self-end'>mariasyk_potter</h6>
                        </div>
                        <Button color='danger'>Follow</Button>
                    </div>
                    <div className='d-flex mr-2 justify-content-between mt-3'>
                        <div className='row'>
                        <img
                            src={userphoto}
                            alt='avatar'
                            width={32}
                            height={32}
                            className='img-fluid rounded-circle ml-4 mr-2 mt-1'
                        />
                        <h6 className='align-self-end'>mariasyk_potter</h6>
                        </div>
                        <Button color='danger'>Follow</Button>
                    </div>
                    <div className='d-flex mr-2 justify-content-between mt-3'>
                        <div className='row'>
                        <img
                            src={userphoto}
                            alt='avatar'
                            width={32}
                            height={32}
                            className='img-fluid rounded-circle ml-4 mr-2 mt-1'
                        />
                        <h6 className='align-self-end'>mariasyk_potter</h6>
                        </div>
                        <Button color='danger'>Follow</Button>
                    </div>
                    <div className='d-flex mr-2 justify-content-between mt-3'>
                        <div className='row'>
                        <img
                            src={userphoto}
                            alt='avatar'
                            width={32}
                            height={32}
                            className='img-fluid rounded-circle ml-4 mr-2 mt-1'
                        />
                        <h6 className='align-self-end'>mariasyk_potter</h6>
                        </div>
                        <Button color='danger'>Follow</Button>
                    </div>
                    <div className='d-flex mr-2 justify-content-between mt-3'>
                        <div className='row'>
                        <img
                            src={userphoto}
                            alt='avatar'
                            width={32}
                            height={32}
                            className='img-fluid rounded-circle ml-4 mr-2 mt-1'
                        />
                        <h6 className='align-self-end'>mariasyk_potter</h6>
                        </div>
                        <Button color='danger'>Follow</Button>
                    </div>
                    <div className='d-flex mr-2 justify-content-between mt-3'>
                        <div className='row'>
                        <img
                            src={userphoto}
                            alt='avatar'
                            width={32}
                            height={32}
                            className='img-fluid rounded-circle ml-4 mr-2 mt-1'
                        />
                        <h6 className='align-self-end'>mariasyk_potter</h6>
                        </div>
                        <Button color='danger'>Follow</Button>
                    </div>
                    <div className='d-flex mr-2 justify-content-between mt-3'>
                        <div className='row'>
                        <img
                            src={userphoto}
                            alt='avatar'
                            width={32}
                            height={32}
                            className='img-fluid rounded-circle ml-4 mr-2 mt-1'
                        />
                        <h6 className='align-self-end'>mariasyk_potter</h6>
                        </div>
                        <Button color='danger'>Follow</Button>
                    </div>
                    <div className='d-flex mr-2 justify-content-between mt-3'>
                        <div className='row'>
                        <img
                            src={userphoto}
                            alt='avatar'
                            width={32}
                            height={32}
                            className='img-fluid rounded-circle ml-4 mr-2 mt-1'
                        />
                        <h6 className='align-self-end'>mariasyk_potter</h6>
                        </div>
                        <Button color='danger'>Follow</Button>
                    </div>
                    <div className='d-flex mr-2 justify-content-between mt-3'>
                        <div className='row'>
                        <img
                            src={userphoto}
                            alt='avatar'
                            width={32}
                            height={32}
                            className='img-fluid rounded-circle ml-4 mr-2 mt-1'
                        />
                        <h6 className='align-self-end'>mariasyk_potter</h6>
                        </div>
                        <Button color='danger'>Follow</Button>
                    </div>
                    <div className='d-flex mr-2 justify-content-between mt-3'>
                        <div className='row'>
                        <img
                            src={userphoto}
                            alt='avatar'
                            width={32}
                            height={32}
                            className='img-fluid rounded-circle ml-4 mr-2 mt-1'
                        />
                        <h6 className='align-self-end'>mariasyk_potter</h6>
                        </div>
                        <Button color='danger'>Follow</Button>
                    </div>
                    <div className='d-flex mr-2 justify-content-between mt-3'>
                        <div className='row'>
                        <img
                            src={userphoto}
                            alt='avatar'
                            width={32}
                            height={32}
                            className='img-fluid rounded-circle ml-4 mr-2 mt-1'
                        />
                        <h6 className='align-self-end'>mariasyk_potter</h6>
                        </div>
                        <Button color='danger'>Follow</Button>
                    </div><div className='d-flex mr-2 justify-content-between mt-3'>
                        <div className='row'>
                        <img
                            src={userphoto}
                            alt='avatar'
                            width={32}
                            height={32}
                            className='img-fluid rounded-circle ml-4 mr-2 mt-1'
                        />
                        <h6 className='align-self-end'>mariasyk_potter</h6>
                        </div>
                        <Button color='danger'>Follow</Button>
                    </div>
                    <div className='d-flex mr-2 justify-content-between mt-3'>
                        <div className='row'>
                        <img
                            src={userphoto}
                            alt='avatar'
                            width={32}
                            height={32}
                            className='img-fluid rounded-circle ml-4 mr-2 mt-1'
                        />
                        <h6 className='align-self-end'>mariasyk_potter</h6>
                        </div>
                        <Button color='danger'>Follow</Button>
                    </div>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
