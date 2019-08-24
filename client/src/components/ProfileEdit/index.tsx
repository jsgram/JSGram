import React, {ReactElement} from 'react';
import {Field} from 'redux-form';
import {Button, Form, FormProps, Spinner} from 'reactstrap';
import noAvatar from '../../assets/noAvatar.svg';
import PopUpModal from '../PopUp';
import {IUser} from '../../store/commonInterfaces/commonInterfaces';
import {renderField} from '../CommonComponents/ReduxFormFields';

interface IProps {
    initialValues: {
        photo: string;
    };
    deletePhoto: () => void;
    handleSubmit: () => void;
    onChangeProfile: (user: IUser) => IUser;
    submitting: boolean;
}

const ProfileEdit = (props: IProps): ReactElement => {

    const {handleSubmit, onChangeProfile, submitting}: FormProps = props;
    const {photo}: { photo: string } = props.initialValues;
    return (
        <div>

            <Form className='mt-4 bg-white text-center border p-4' onSubmit={handleSubmit(onChangeProfile)}>
                <img
                    src={photo || noAvatar}
                    className='img-fluid'
                    alt='avatar'
                    height={150}
                    width={150}
                />
                <PopUpModal deletePhoto={props.deletePhoto}/>
                <Field
                    name='fullName'
                    type='text'
                    component={renderField}
                    label='fullname'
                    placeholder='Fullname'
                    className='form-control'
                />
                <Field
                    name='username'
                    type='text'
                    component={renderField}
                    label='username'
                    placeholder='Username'
                    className='form-control mt-3'
                />
                <Field
                    name='description'
                    type='textarea'
                    component={renderField}
                    label='description'
                    placeholder='Description'
                    className='form-control mt-3'
                />
                <Button
                    className='btn mt-3'
                    color='danger'
                    disabled={submitting}
                >
                    <i className='fa fa-save pr-3'/>
                    Save profile
                </Button>
                {submitting && <Spinner className='mt-3' color='dark'/>}

            </Form>
        </div>

    );
};

export default ProfileEdit;
