import React from 'react';
import { FormProps, UncontrolledAlert } from 'reactstrap';
import { clearAlert } from '../../store/alert/actions';
import './style.scss';

export default class Alert extends React.Component<FormProps> {
    public timeout: any = null;

    public componentDidMount(): void {
        this.timeout = setTimeout(() => {
            this.props.clearAlert();
        }, 3000);
    }

    public componentWillUnmount(): void {
        clearTimeout(this.timeout);
        this.timeout = 0;
    }

    public render(): JSX.Element {
        const {message, color}: FormProps = this.props;
        return message && (
            <UncontrolledAlert
                color={color}
                className='position-fixed'
                onClick={(): void => {
                    clearAlert();
                }}>{message}
            </UncontrolledAlert>
        );
    }
}
