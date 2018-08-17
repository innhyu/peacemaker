/**
 * Utility that helps find the midpoint between multiple positions
 */
export default class WayFinder {

    /**
     * Function that finds the midpoint given all positions in lon / lat
     *
     * @param positions - array of objects with lat and lon
     */
    static midPoint(positions){
        const x = [];
        const y = [];
        const z = [];

        positions.forEach(position => {
            x.push(WayFinder.xOf(position));
            y.push(WayFinder.yOf(position));
            z.push(WayFinder.zOf(position));
        });

        const midX = x.reduce((a,b) => a + b) / positions.length;
        const midY = y.reduce((a,b) => a + b) / positions.length;
        const midZ = z.reduce((a,b) => a + b) / positions.length;

        const newLonRad = Math.atan2(midY, midX);
        const hyp = Math.sqrt(midX * midX + midY * midY);
        const newLatRad = Math.atan2(midZ, hyp);

        const newLon = newLonRad * (180 / Math.PI);
        const newLat = newLatRad * (180 / Math.PI);

        return {newLon, newLat}
    }

    /**
     * Function that computes the x coordinate given lon / lat
     */
    static xOf({y: lat, x: lon}){
        return Math.cos(WayFinder.toRad(lat)) * Math.cos(WayFinder.toRad(lon));
    }

    /**
     * Function that computes the y coordinate given lon / lat
     */
    static yOf({y: lat, x: lon}){
        return Math.cos(WayFinder.toRad(lat)) * Math.sin(WayFinder.toRad(lon));
    }

    /**
     * Function that computes the z coordinate given lon / lat
     */
    static zOf({y: lat}){
        return Math.sin(WayFinder.toRad(lat));
    }

    /**
     * Function that returns the input in radians
     */
    static toRad(notRad){
        return notRad * (Math.PI / 180);
    }

}

