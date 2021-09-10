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
 * Debugging function to print data for a single feature
 * 
 * @param {string} path input geojson file path 
 * @param {string} name - name of feature
 */
 function viewDataForFeature(path, name) {
    const coords = JSON.parse(fs.readFileSync(path, { encoding: 'utf8', flag: 'r' }));

    featureEach(coords, (curr, idx) => {
        if (curr.properties.name === name) {
            console.log(curr, idx);
        }
    });
}

/**
 * For each feature, computes its center and returns a new FeatureCollection \
 * that contains the feature' centers in their properties
 * 
 * @param {FeatureCollection} coords FeatureCollection - without feature' centers 
 * @param {number} precision - round centers to given places after comma
 * @returns {FeatureCollection} FeatureCollection that contains feature' centers in their properties
 */
function generateFeaturesWithCenters(coords, precision) {
    const newFeatureCollectionArr = [];
    let mainArea;

    featureEach(coords, (curr, idx) => {
        // Ignore empty features 
        // if (!curr.geometry) {return;}
    
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
        mainAreaCenter = mainAreaCenter.map((coord) => parseFloat(coord.toFixed(precision)));

        // Add caululated centeroid to the feature's properties
        curr.properties.center = mainAreaCenter;

        // Update polygon id (fixes incorrect ids in oryginal geojson file)
        curr.properties.id = idx;
        
        newFeatureCollectionArr.push(curr);
    })

    return featureCollection(newFeatureCollectionArr);
}

/**
 * Generate a new FeatureCollection without 'ISO3166-1-Alpha-3'
 * 
 * @param {FeatureCollection} coords FeatureCollection
 * @returns {FeatureCollection} FeatureCollection without 'ISO3166-1-Alpha-3'
 */
function generateMinifiedFeatures(coords) {
    const newFeatureCollectionArr = [];

    featureEach(coords, (curr, idx) => {
        delete curr.properties['ISO3166-1-Alpha-3'];
        curr.properties.id = idx;

        newFeatureCollectionArr.push(curr);
    });

    return featureCollection(newFeatureCollectionArr);
}

/**
 * Generates a GeoJson file that icludes feature' centers coords
 * 
 * @param {string} oldFile input geojson file path 
 * @param {number} precision - round centers to given places after comma
 * @param {string} newFile output geojson filename
 * @param {string} fileToGenerate choose between 'full-with-centers' or 'minified'
 */
function generateNewGeoJson(oldFile, newFile, precision, fileToGenerate) {
    const coords = JSON.parse(fs.readFileSync(oldFile, { encoding: 'utf8', flag: 'r' }));
    let newCoords;
    // Choose between geojson with full data and centers properties
    // and geojson without ISO3166-1-Alpha-3
    if (fileToGenerate === 'full-with-centers') {
        newCoords = generateFeaturesWithCenters(coords, precision);
    }
    else if (fileToGenerate === 'minified') {
        newCoords = generateMinifiedFeatures(coords, precision);
    }
    else {new Error('Incorrect fileToGenerate type')}

    fs.writeFile(`${newFile}.json`, JSON.stringify(newCoords), (err) => err ? console.log(err) : null);
}


const data_path = "./helper_functions/polygonsCenters/data/"
// viewDataForFeature("./data/admin-center-m.json", 'Lesser Poland')

// Creates new geojson with full data and centers properties
// generateNewGeoJson(data_path+"admin-m.json", data_path+"admin-center-m", 3, 'full-with-centers');

// Creates new geojson without ISO3166-1-Alpha-3
// generateNewGeoJson(data_path+"admin-m.json", data_path+"admin-min-m", 3, 'minified');

export default generateNewGeoJson;