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

const createUsers = () => {
    let users = [];

    for (let i = 1; i <= 20; i++) {
        users.push({
            id: i,
            name: `${lorem.generateWords(2)} ${lorem.generateWords(1)}`,
            avatar: '/images/profile/photo/photo.jpg',
            tag: `user${i}`,
            socials: [
                { name: 'vkontakte', link: '#' },
                { name: 'instagram', link: '#' },
                { name: 'facebook', link: '#' },
                { name: 'twitter', link: '#' },
            ],
        });
    }

    return users;
};

const users = createUsers();

export default defineCachedEventHandler(async () => {
    return users;
}, {
    swr: true,
    maxAge: 60 * 30,
    staleMaxAge: 60 * 30
});