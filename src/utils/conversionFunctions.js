export function getHoursFromTime(time) {
    //#DEBUG #TODO
    if(!time) {return null}

    const [hours, minutes] = time.split(':');

    return Math.round(parseInt(hours) + parseInt(minutes)/60);
}