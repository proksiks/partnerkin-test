import { LoremIpsum } from "lorem-ipsum";
const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
});

const createUser = (id: string) => {
    return {
        id: parseInt(id),
        name: `${lorem.generateWords(2)} ${lorem.generateWords(1)}`,
        avatar: '/images/profile/photo/photo.jpg',
        tag: `user${id}`,
        socials: [
            { name: 'vkontakte', link: '#' },
            { name: 'instagram', link: '#' },
            { name: 'facebook', link: '#' },
            { name: 'twitter', link: '#' },
        ],
    };
};

export default defineCachedEventHandler(async (event) => {
    const id = event.context.params?.id ?? '0';
    return createUser(id);
}, {
    swr: true,
    maxAge: 60 * 30,
    staleMaxAge: 60 * 30
});