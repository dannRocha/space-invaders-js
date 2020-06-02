import binary from './binary/Binary.js'

export default class Search
{
    constructor()
    {
        throw new Error("")
    }
    /**
     * 
     * @param {Array} array 
     * @param {Number} value
     *  
     */
    static binary(array, value)
    {
        return binary(array, 0, array.length - 1, value)
    }
}