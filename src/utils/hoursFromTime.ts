export function getHoursFromTime(time: string): number {
    const [hours, minutes] = time.split(":");

    return Math.round(parseInt(hours) + parseInt(minutes) / 60);
}
