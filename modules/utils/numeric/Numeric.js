export default class Numeric
{
    constructor()
    {
        throw new Error( 'class "Numeric" must not be instantiated' )
    }
    
    /**
     * 
     * @param {number} value 
     */
    static isNumber(value)
    {
        return typeof value === 'number'
    }  
    
    /**
     * returns a random number between MAX_SAFE_INTEGER and MIN_SAFE_INTEGER
     */
    static Random()
    {
        return ( Date.now() % 2 ) 
            ? Math.random() * Number.MAX_SAFE_INTEGER
            : Math.random() * Number.MIN_SAFE_INTEGER
    }
}

