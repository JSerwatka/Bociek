function getTempColor(temp) {
    return  temp > 40  ? '#d73027' :
            temp > 30  ? '#f46d43' :
            temp > 20  ? '#fdae61' :
            temp > 10  ? '#fee090' :
            temp > 0   ? '#ffffbf' :
            temp > -10 ? '#e0f3f8' :
            temp > -20 ? '#abd9e9' :
            temp > -30 ? '#74add1' :
                        '#4575b4';
}
  
function getPrecipitationColor(precipitation) {
    return  precipitation > 400  ? '#023858' :
            precipitation > 300  ? '#045a8d' :
            precipitation > 200  ? '#0570b0' :
            precipitation > 150  ? '#3690c0' :
            precipitation > 100  ? '#74a9cf' :
            precipitation > 80   ? '#a6bddb' :
            precipitation > 50   ? '#d0d1e6' :
            precipitation > 20   ? '#ece7f2' :
                                    '#fff7fb';
} 
  
function getDaylengthColor(daylength) {
    //#DEBUG
    if(!daylength){return '#ce1256'}
    const [hours, minutes] = daylength.split(':');
    const hoursNormalized = parseInt(hours) + parseInt(minutes)/60

    return  hoursNormalized > 18  ? '#ffffff' :
            hoursNormalized > 16  ? '#f0f0f0' :
            hoursNormalized > 14  ? '#d9d9d9' :
            hoursNormalized > 12  ? '#bdbdbd' :
            hoursNormalized > 10  ? '#969696' :
            hoursNormalized > 8   ? '#737373' :
            hoursNormalized > 6   ? '#525252' :
            hoursNormalized > 4   ? '#252525' :
                                    '#000000';
}


function getColor(dataType, value) {
    let color;

    switch (dataType) {
        case 'temp':
            color = getTempColor(value);
            break;
        case 'rain':
            color = getPrecipitationColor(value);
            break;
        case 'daylength':
            color = getDaylengthColor(value);
            break;
        default:
            throw new Error('Incorrect data type');
    }

    return color;
}

export default getColor;