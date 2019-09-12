import React, { ReactElement } from 'react';
import { Button } from 'reactstrap';
import userphoto from '../../assets/user1.png';
import './style.scss';
interface IFollowData {
    username: string;
}
export const FollowList = ({title,data}: { title: string, data: IFollowData[]}): ReactElement=> (
    <div>
        <h4 className='text-center'>{title}</h4>
            <div className='d-flex justify-content-center'> 
                    <div className='follow-wrapper'>
                    {data.map((item: any) => (
                        <div className='d-flex mt-1 mb-3 justify-content-between' key={item.username}>
                            <div className='row'>
                                <img
                                    src={userphoto}
                                    alt='avatar'
                                    width={32}
                                    height={32}
                                    className='img-fluid rounded-circle ml-2 mr-2 mt-1'
                                />
                                <h6 className='align-self-end'>{item.username}</h6>
                            </div>
                            <Button color='danger'>Follow</Button>
                        </div>
                    ))}
                    </div>
            </div>
        </div>
        );
