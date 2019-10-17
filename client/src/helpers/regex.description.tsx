import React from 'react';
import { Link } from 'react-router-dom';

const HASH_REGEXP = /[#][A-z0-9_.]+/;
const MENTION_REGEXP = /[@][A-z0-9_.]+/;
const LINK_REGEXP = /(?:(?:https?|ftp):\/\/|www\.)[^\s/$.?#].[^\s]*/;

const hashtagRegex = new RegExp(`(${HASH_REGEXP.source}|${MENTION_REGEXP.source}|${LINK_REGEXP.source})`, 'ig');
export const formatDescription = (description: string): any =>
    description && description.split(hashtagRegex).map((token: string) => {
        switch (true) {
            case HASH_REGEXP.test(token):
                return (<Link to={`/tag/${token.slice(1)}`}>{token}</Link>);
            case MENTION_REGEXP.test(token):
                return (<Link to={`/profile/${token.slice(1)}`}>{token}</Link>);
            case LINK_REGEXP.test(token):
                return (<a href={token}>{token}</a>);
            default:
                return token;
        }
    },
    );
