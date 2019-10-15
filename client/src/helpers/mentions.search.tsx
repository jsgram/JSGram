import { MENTIONS_REGEX } from './regex.description';
export const FIRST_PAGE = 1;

export const getResultsWithTimer = (getSearchResults: (query: string, page: number) => void,
                                    query: string, page: number, toggle: (value: string) => void): any => {
    return setTimeout(() => {
        getSearchResults(query.slice(1), page);
        toggle(query);
    }, 500);
};
export const checkForMentions = (targetValue: string, self: any): void => {
    clearTimeout(self.timer);
    const mentions: any = targetValue.match(MENTIONS_REGEX);
    if (mentions) {
        const query: string = mentions[mentions.length - 1];
        self.setState({searchValue: query});
        self.state.searchValue !== query ?
              self.timer = getResultsWithTimer(self.props.getSearchResults, query, FIRST_PAGE, self.toggle) :
              self.toggle('');
    } else {
        self.toggle('');
    }
};

export const onResultClick = (targetValue: string, username: string, updateTargetValue: any, self: any): void => {
    const mentions: any = targetValue.match(MENTIONS_REGEX);
    const query: string = mentions.pop();
    const updValue = targetValue.replace(new RegExp(query + '$'), `@${username}`);
    self.props.postId ? updateTargetValue(self.props.postId, updValue) : updateTargetValue(updValue);
    self.setState({searchValue: `@${username}`});
    self.props.clearSearchResults();
    self.toggle('');
};

export const getMoreResults = (targetValue: string, self: any): void => {
    const mentions: any = targetValue.match(MENTIONS_REGEX);
    const query: string = mentions.pop();
    self.props.addNextResults(self.props.page + 1);
    self.props.getSearchResults(query.slice(1), self.props.page);
};
