import GameObject from '../../modules/gameObject/GameObject.js'
import Numeric from '../../modules/utils/numeric/Numeric.js'

export default class Bullets extends GameObject
{
    constructor(name)
    {
        super(name)

        this.__sense = 0
    }

    set Sense(sense)
    {
        if(!Numeric.isNumber(sense))
        {
            throw new TypeError(`Error: "SET" -> "${this.__name}.Sense" must be a number`)
        }

        this.__sense = sense
    }


    get Sense()
    {
        return this.__sense
    }

}