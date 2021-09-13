export function getHoursFromTime(time) {
    const [hours, minutes] = time.split(':');

    return Math.round(parseInt(hours) + parseInt(minutes)/60);
}