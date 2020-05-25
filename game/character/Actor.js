import GameObject from '../../modules/gameObject/GameObject.js'
import Numeric from '../../modules/utils/numeric/Numeric.js'

export default class Actor extends GameObject
{
    constructor(name)
    {
        super(name)
        this.__bullets = []
        this.__live = 0
        this.__score = 0
        this.__sense = 0
    }

    get Bullets()
    {
        return this.__bullets
    }

    get Live()
    {
        return this.__live
    }

    get Score()
    {
        return this.__pointer
    }

    get Sense()
    {
        return this.__sense
    }

    set Live(live)
    {
        if(!Numeric.isNumber(live))
        {
            throw new TypeError(`Error: "${this.__name}.Live" defines a numeric value`)
        }

        this.__live = live
    }

    set Score(score)
    {
        if(!Numeric.isNumber(score))
        {
            throw new TypeError(`Error: "SET" -> "${this.__name}.Score" must be a number`)
        }
        
        this.__score = score
    }

    set Sense(sense)
    {
        if(!Numeric.isNumber(sense))
        {
            throw new TypeError(`Error: "SET" -> "${this.__name}.Sense" must be a number`)
        }

        this.__sense = sense
    }


    /**
     * 
     * @param {GameObject} bullet 
     */
    AddBullets(bullet)
    {

        if(bullet?.TypeOf !== 'GameObject')
        {
            throw new TypeError(`Error: "SET" -> "${this.__name}.AddBullets" must be a GameObject`)
        }

        this.__bullets.push(bullet)
    }

    RemoveBullets()
    {
        this.__bullets.shift()
    }
}