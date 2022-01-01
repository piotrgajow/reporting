export function decode(text: string | undefined): number[] {
    if (text === '.' || text === undefined) {
        return [];
    }

    const parts = text.split(',');

    return parts.reduce((acc, curr) => {
        if (curr.includes('-')) {
            return [...acc, ...decodeRange(curr)];
        }
        return [...acc, Number.parseInt(curr, 10)];
    }, [] as number[]);
}

function decodeRange(text: string): number[] {
    const [startText, endText] = text.split('-');
    const start = Number.parseInt(startText, 10);
    const end = Number.parseInt(endText, 10);
    const array: number[] = [];
    for (let i = start; i <= end; i++) {
        array.push(i);
    }
    return array;
}
