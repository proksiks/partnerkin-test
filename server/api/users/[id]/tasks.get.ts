import { LoremIpsum } from "lorem-ipsum";
import { randomIntFromInterval } from "../../../utils/randomIntFromInterval";

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

const createTasks = (userId: string) => {
    let tasks = [];
    const tasksCount = randomIntFromInterval(5, 15);

    for (let i = 1; i <= tasksCount; i++) {
        tasks.push({
            id: i,
            type: lorem.generateWords(1),
            title: lorem.generateWords(randomIntFromInterval(3, 7)),
            text: lorem.generateWords(randomIntFromInterval(20, 50)),
            time: `${randomIntFromInterval(1, 30)} дней`,
            payment: `${randomIntFromInterval(500, 10000)} руб`,
            userId: parseInt(userId)
        });
    }

    return tasks;
};

export default defineCachedEventHandler(async (event) => {
    const userId = event.context.params?.id ?? '';
    return createTasks(userId);
}, {
    swr: true,
    maxAge: 60 * 30,
    staleMaxAge: 60 * 30
});