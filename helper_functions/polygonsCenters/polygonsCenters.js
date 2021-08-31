import centroid from '@turf/centroid';
import { polygon, featureCollection } from '@turf/helpers';
import area from '@turf/area'
import { featureEach } from '@turf/meta'
import fs from 'fs';


/**
  * Returns index of the max element in the array
  * @param {Array.<number>} arr 
  * @return {number} max element in the array
*/
function findIndexOfMax(arr) {
    let maxIndex = 0;
    let max = arr[0];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
            maxIndex = i;
        }
    }

    return maxIndex;
}


/**
  * Returns index of the polygon with the largest area 
  * @param {Feature<Polygon>} feature Mutipolygon Feature
  * @return {number} index of the largest area
*/
function findMaxAreaIndex(feature) {
    // Create an array of area sizes from each polygon
    const areaArr = feature.geometry.coordinates.map((featurePolygon) => {
        return area(polygon(featurePolygon));
    });

    return findIndexOfMax(areaArr);
}


/**
 * For each feature, computes its center and returns a new FeatureCollection \
 * that contains the feature' centers in their properties
 * 
 * @param {FeatureCollection} coords FeatureCollection - without feature' centers 
 * @param {number} precision - round centers to given places after comma
 * @returns {FeatureCollection} FeatureCollection that contains feature' centers in their properties
 */
function generateNewFeatureCollection(coords, precision) {
    const newFeatureCollectionArr = [];
    let mainArea;

    featureEach(coords, (curr, idx) => {
        // Ignore empty features 
        if (!curr.geometry) {return;}
    
        // For MultiPolyon treat the largest area as the main area
        if (curr.geometry.type === "MultiPolygon") {
            const maxAreaIndex = findMaxAreaIndex(curr);
            mainArea = curr.geometry.coordinates[maxAreaIndex];
        }
        else {
            mainArea = curr.geometry.coordinates;
        }

        // Find the center of the feature and round it
        let mainAreaCenter = centroid(polygon(mainArea)).geometry.coordinates;
        mainAreaCenter = mainAreaCenter.map((coord) => parseFloat(coord.toFixed(precision)))

        // Add caululated centeroid to the feature's properties
        curr.properties.center = mainAreaCenter;
        
        newFeatureCollectionArr.push(curr);
    })

    return featureCollection(newFeatureCollectionArr);
}

/**
 * Generates a GeoJson file that icludes feature' centers coords
 * 
 * @param {string} oldFilePath input geojson file path 
 * @param {number} precision - round centers to given places after comma
 * @param {string} fileName output geojson filename
 */
function generateNewGeoJson(oldFilePath, fileName, precision) {
    const coords = JSON.parse(fs.readFileSync(oldFilePath, { encoding: 'utf8', flag: 'r' }));
    const newCoords = generateNewFeatureCollection(coords, precision);

    fs.writeFile(`${fileName}.json`, JSON.stringify(newCoords), (err) => err ? console.log(err) : null);
}

const data_path = "./helper_functions/polygonsCenters/data/"
generateNewGeoJson(data_path+"admin-m.json", data_path+"admin-ceneter-m", 3);
// export default generateNewGeoJson;
