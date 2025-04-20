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

const createData = () => {
    let data = []

    for (let i = 1; i <= 20; i++) {
        data.push({
            id: i,
            title: lorem.generateWords(randomIntFromInterval(1, 10)),
            body: lorem.generateWords(randomIntFromInterval(1, 50)),
            author: lorem.generateWords(randomIntFromInterval(2, 3)),
            userId: i,
            content: lorem.generateWords(randomIntFromInterval(1, 1000)),
            to: `/articles/${i}`
        })
    }

    return data
}


const posts = createData()

export default defineCachedEventHandler(async () => {
    return posts
}, {
    swr: true,
    maxAge: 60 * 30,
    staleMaxAge: 60 * 30
})