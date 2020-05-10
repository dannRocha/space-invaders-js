export default class Numeric
{
    constructor()
    {
        throw 'class "Numeric" must not be instantiated'
    }
    

    static isNumber = function(value)
    {

        if(typeof(value) !== 'number') return false
        
        return true
    }  
}

