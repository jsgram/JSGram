import React from 'react';

const HASH_REGEXP = /[#][A-z]+/;
const MENTION_REGEXP = /[@][A-z]+/;
const LINK_REGEXP = /(?:(?:https?|ftp):\/\/|www\.)[^\s/$.?#].[^\s]*/;

const hashtagRegex = new RegExp(`(${HASH_REGEXP.source}|${MENTION_REGEXP.source}|${LINK_REGEXP.source})`, 'ig');
export const formatDescription = (description: string): any =>
    description && description.split(hashtagRegex).map((token: string) => {
        switch (true) {
            case !!token.match(HASH_REGEXP):
                return (<a href={`/profile/${token.slice(1)}`}>{token}</a>);
            case !!token.match(MENTION_REGEXP):
                return (<a href={`/profile/${token.slice(1)}`}>{token}</a>);
            case !!token.match(LINK_REGEXP):
                return (<a href={token}>{token}</a>);
            default:
                return token;
        }
    },
    )
