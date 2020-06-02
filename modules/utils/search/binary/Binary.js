/**
 * 
 * @param {Array} array 
 * @param {Number} left 
 * @param {Number} right 
 * @param {Number} value 
 */
export default function binarySearch(array, left, right, value)
{
    if(array.length === 1) return 0

    if(right > left)
    {
        const index = parseInt(left + (right - left) / 2)
        
        if(array[index] === value)
        {
            return index
        }

        if(array[index] > value)
        {
            return binarySearch(array, left, index - 1, value)
        }

        return binarySearch(array, index + 1, right, value)
    }

    return -1
}