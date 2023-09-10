function declOfNum(number, titles) {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[
        number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]
    ];
}

export const timeConverter = (num) => {
    const minutes = num % 60;
    const hours = (num - minutes) / 60;
    if (hours === 0) {
        return `${minutes} ${declOfNum(minutes, ['минута', 'минуты', 'минут'])}`;
    } else if (minutes === 0) {
        return `${hours} ${declOfNum(hours, ['час', 'часа', 'часов'])}`;
    } else {
        return `${hours} ${declOfNum(hours, ['час', 'часа', 'часов'])} ${minutes} ${declOfNum(minutes, [
            'минута',
            'минуты',
            'минут',
        ])}`;
    }
};