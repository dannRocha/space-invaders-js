import { GameObject, Numeric, Vector2D } from '../../modules/mod.js'

export default class Bullets extends GameObject
{
    constructor(name)
    {
        super(name)

        this.__sense = 0
    }
    
    set Sense(sense)
    {
        if(sense?.TypeOf !== 'Vector2D')
        {
            throw new TypeError(`"SET" -> "${this.__name}.Sense" must be a Vector2D`)
        }

        this.__sense = Vector2D.copy(sense)
    }


    get Sense()
    {
        return this.__sense
    }

}