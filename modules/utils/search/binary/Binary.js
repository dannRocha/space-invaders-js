/**
 * 
 * @param {*} array 
 * @param {*} value 
 * @param {*} begin 
 * @param {*} end 
 */
export default function binarySearch(array, value, begin = 0, end = array.length - 1)
{
    
    if(begin <= end)
    {
        let m = parseInt((begin + end) / 2)
        
        if(array[m] == value)
        {
            return m
        }
        
        if(value < array[m])
            return binarySearch(array, value, begin, m - 1)
        else
            return binarySearch(array, value, m + 1, end)


    }

    return null
}

