import React from 'react';
import { connect } from 'react-redux';
import { uploadPost } from '../../store/addPost/action';
import AddPostCropper, {IProps} from '../../components/AddPost/AddPostCropper';

class AddPostContainer extends React.Component<IProps> {
    public render(): JSX.Element {
        return(
            <AddPostCropper
                croppedImage={this.props.croppedImage}
                uploadPost={this.props.uploadPost}
            />
        );
    }
}

const mapStateToProps = (state: any): any => ({
    croppedImage: state.addPost.croppedImage,
});

const mapDispatchToProps = {
    uploadPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPostContainer);
