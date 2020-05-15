import GameObject from '../../../modules/gameObject/GameObject.js'
import Numeric from '../../../modules/utils/numeric/Numeric.js'

class Emeny extends GameObject
{
    constructor(name)
    {
        super(name)

        this.__score = 0
    }


    get Score()
    {
        return this.__pointer
    }

    set Score(score)
    {

        if(!Numeric.isNumber(score))
        {
            throw `Error: "SET" -> "${this.__name}.Score" must be a number`
        }
        
        this.__score = score
    }
}


export default Emeny