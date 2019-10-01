import React from 'react';

const HASH_REGEXP = /[#][A-z]+/;
const MENTION_REGEXP = /[@][A-z]+/;
const LINK_REGEXP = /(?:(?:https?|ftp):\/\/|www\.)[^\s/$.?#].[^\s]*/;

const hashtagRegex = new RegExp(`(${HASH_REGEXP.source}|${MENTION_REGEXP.source}|${LINK_REGEXP.source})`, 'ig');
export const formatDescription = (description: string): any =>
    description && description.split(hashtagRegex).map((token: string) => {
        switch (true) {
            case HASH_REGEXP.test(token):
                return (<a href={`/profile/${token.slice(1)}`}>{token}</a>);
            case MENTION_REGEXP.test(token):
                return (<a href={`/profile/${token.slice(1)}`}>{token}</a>);
            case LINK_REGEXP.test(token):
                return (<a href={token}>{token}</a>);
            default:
                return token;
        }
    },
    );
