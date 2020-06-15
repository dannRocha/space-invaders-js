import { GameObject, Numeric, Vector2D } from '../../modules/mod.js'

export default class Actor extends GameObject
{
    /**
     * 
     * @param {string} name 
     */
    constructor(name)
    {
        super(name)
        this.__bullets = []
        this.__lives = 0
        this.__score = 0
        this.__sense = new Vector2D()
    }

    get Bullets()
    {
        return this.__bullets
    }

    get Lives()
    {
        return this.__lives
    }

    get Score()
    {
        return this.__score
    }

    get Sense()
    {
        return this.__sense
    }

    set Lives(lives)
    {
        if(!Numeric.isNumber(lives))
        {
            throw new TypeError(`Error: "${this.__name}.Live" defines a numeric value`)
        }

        this.__lives = lives
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
        if(sense?.TypeOf !== 'Vector2D')
        {
            throw new TypeError(`"SET" -> "${this.__name}.Sense" must be a Vector2D`)
        }

        this.__sense = Vector2D.copy(sense)
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