
const NOW = new Date();

export function daysInMonth(month: number, year: number): number {
    return new Date(year, month, 0).getDate();
}

export function workingDaysInMonth(month: number, year: number): number[] {
    const workingDays: number[] = [];
    const numberOfDays = daysInMonth(month, year);

    let day: number;
    let date: Date;
    for (day = 1; day <= numberOfDays; day++) {
        date = new Date(year, month - 1, day);
        if (date.getDay() !== 0 && date.getDay() !== 6) {
            workingDays.push(day);
        }
    }

    return workingDays;
}

export function currentMonth(): number {
    return NOW.getMonth() + 1;
}

export function currentYear(): number {
    return NOW.getFullYear();
}
