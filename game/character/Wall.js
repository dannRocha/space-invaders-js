import GameObject from '../../modules/gameObject/GameObject.js'
import Numeric from '../../modules/utils/numeric/Numeric.js'

export default class Wall extends GameObject
{
    constructor(name)
    {
        super(name)
        this.__resistance
    }

    get Resistance()
    {
        return this.__resistance
    }

    set Resistance(resistance)
    {
        if(!Numeric.isNumber(resistance))
        {
            throw new TypeError(`"${this.__name}.Resistance" defines a numeric value`)
        }

        this.__resistance = resistance
    }

}