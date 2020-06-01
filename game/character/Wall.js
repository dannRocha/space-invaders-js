import { GameObject, Numeric } from '../../modules/mod.js'

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