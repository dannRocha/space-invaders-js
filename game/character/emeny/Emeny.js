import GameObject from '../../../modules/gameObject/GameObject.js'
import Numeric from '../../../modules/utils/numeric/Numeric.js'

class Emeny extends GameObject
{
    constructor(name)
    {
        super(name)

        this.__pointer = 0
    }


    get Pointer()
    {
        return this.__pointer
    }

    set Pointer(pointer)
    {

        if(!Numeric.isNumber(pointer))
        {
            throw 'Error: "SET" -> "Emeny.Pointer" must be a number'
        }
        
        this.__pointer = pointer
    }
}


export default Emeny