const tempGrades = [-9999, -30, -20, -10, 0, 10, 20, 30, 40]
const precipitationGrades = [-9999, 20, 50, 80, 100, 150, 200, 300, 400]
const datLengthGrades = [-9999, 4, 6, 8, 10, 12, 14, 16, 18]


function getTempColor(temp) {
    return (
        temp > tempGrades[8] ? '#d73027' :
        temp > tempGrades[7] ? '#f46d43' :
        temp > tempGrades[6] ? '#fdae61' :
        temp > tempGrades[5] ? '#fee090' :
        temp > tempGrades[4] ? '#ffffbf' :
        temp > tempGrades[3] ? '#e0f3f8' :
        temp > tempGrades[2] ? '#abd9e9' :
        temp > tempGrades[1] ? '#74add1' :
                                '#4575b4'
    );
}
  
function getPrecipitationColor(precipitation) {
    return (
        precipitation > precipitationGrades[8] ? '#023858' :
        precipitation > precipitationGrades[7] ? '#045a8d' :
        precipitation > precipitationGrades[6] ? '#0570b0' :
        precipitation > precipitationGrades[5] ? '#3690c0' :
        precipitation > precipitationGrades[4] ? '#74a9cf' :
        precipitation > precipitationGrades[3] ? '#a6bddb' :
        precipitation > precipitationGrades[2] ? '#d0d1e6' :
        precipitation > precipitationGrades[1] ? '#ece7f2' :
                                                 '#fff7fb'
    );
} 
  
function getDaylengthColor(hours) {
    //#DEBUG #TODO
    if(hours === null){return '#ce1256'}

    return (
        hours > datLengthGrades[8] ? '#ffffff' :
        hours > datLengthGrades[7] ? '#f0f0f0' :
        hours > datLengthGrades[6] ? '#d9d9d9' :
        hours > datLengthGrades[5] ? '#bdbdbd' :
        hours > datLengthGrades[4] ? '#969696' :
        hours > datLengthGrades[3] ? '#737373' :
        hours > datLengthGrades[2] ? '#525252' :
        hours > datLengthGrades[1] ? '#252525' :
                                               '#000000'
    );
}

export const grades = {
    'temp': tempGrades,
    'rain': precipitationGrades,
    'daylength' : datLengthGrades
};

export default function getColor(dataType, value) {
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

