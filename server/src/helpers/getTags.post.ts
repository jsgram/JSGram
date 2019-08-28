export const getTags = (description: string): any => {
    const hashtagRegex = /\B(\#[a-zA-Z0-9]+\b)/g;

    const hashTags = description && description.match(hashtagRegex);
    const tags = hashTags ? hashTags.map((tag: string) => tag.slice(1)) : [];

    return tags;
};
