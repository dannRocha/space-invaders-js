import GameObject from '../../../modules/gameObject/GameObject.js'
import Numeric  from '../../../modules/utils/numeric/Numeric.js'

export default class Ship extends GameObject
{
    constructor(name)
    {
        super(name)
        this.__bullets = []
        this.__live = 0
    }

    get Bullets()
    {
        return this.__bullets
    }

    get Live()
    {
        return this.__live
    }

    set Live(live)
    {
        if(!Numeric.isNumber(live))
        {
            throw `Error: "${this.__name}.Live" defines a numeric value`
        }

        this.__live = live
    }

    AddBullets()
    {

    }

    RemoveBullets()
    {

    }

    

}


