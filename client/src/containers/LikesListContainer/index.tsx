import React from 'react';
import { connect } from 'react-redux';
import { LikeList } from '../../components/LikeList';

const LikeListContainer = (): JSX.Element => <LikeList />;

export default connect(null, null)(LikeListContainer);
