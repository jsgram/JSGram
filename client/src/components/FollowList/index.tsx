import React, { ReactElement } from 'react';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import userphoto from '../../assets/user1.png';
import './style.scss';
interface IFollowData {
    username: string;
}
export const FollowList = ({toggle, modal, title,data}: {toggle: () => void,
    modal: boolean, title: string, data: IFollowData[]}): ReactElement=> (
            <div>
                <Modal className='modal-dialog-centered followers-modal' isOpen={modal}>
                    <ModalHeader className='modal-header' toggle={toggle}>
                        <p>{title}</p>
                    </ModalHeader>
                    <ModalBody className='modal-body'>
                    {data.map((item: any) => (
                        <div className='d-flex mr-2 justify-content-between mt-3 mb-1' key={item.username}>
                            <div className='row'>
                                <img
                                    src={userphoto}
                                    alt='avatar'
                                    width={32}
                                    height={32}
                                    className='img-fluid rounded-circle ml-4 mr-2 mt-1'
                                />
                                <h6 className='align-self-end'>{item.username}</h6>
                            </div>
                            <Button color='danger'>Follow</Button>
                        </div>
                    ))}
                    </ModalBody>
                </Modal>
            </div>
        );
