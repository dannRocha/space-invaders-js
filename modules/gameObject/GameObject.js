import { Numeric, Vector2D } from '../mod.js'

function isValidSpriteSheetCoordinates(...coords)
{
    for(const coord of coords)
    {
        if(!Numeric.isNumber(coord)) return false
    }

    return true
}

const ERROR = {
    ID:`
    Define an identification for the actor in the constructor
            
    Example:
        class Hero extends Actor {}
        const hero = new Hero ('myCharacter')
    `
}


export default class GameObject 
{
    constructor(name)
    {
        // this.__x = 0
        // this.__y = 0
        this.__position = new Vector2D()
        this.__width = 0
        this.__height = 0
        this.__currentSprite = 0
        this.__transform = 0
        this.__spriteSheetCoordinates = []
        this.__speed = new Vector2D()
        this.__id = parseInt(Numeric.Random())
        this.__enable = true
        
        if(!name)
        {
            throw ERROR.ID
        }

        this.__name = name

        this.__typeOf = 'GameObject'

    }

    get X()
    {
        return this.__position.X
    }

    get Y()
    {
        return this.__position.Y
    }

    get Position()
    {
        return this.__position
    }

    get Width()
    {
        return this.__width
    }

    get Height()
    {
        return this.__height
    }
    
    get Speed()
    {
        return this.__speed
    }

    get CollisionBox()
    {
        return {
            LEFT,
            RIGTH,
            TOP,
            BOTTOM
        }
    }

    get SpriteSheetCoordinates()
    {
        return this.__spriteSheetCoordinates
    }
    
    get CurrentSprite()
    {
        return this.__currentSprite
    }

    get TypeOf()
    {
        return this.__typeOf
    }

    get Id()
    {
        return this.__id
    }

    get Transform()
    {
        return this.__transform
    }

    get Enable()
    {
        return this.__enable
    }

    set X(x)
    {
        throw new Error(`${this.__name}.X cannot be defined. Change ${this.__name}.Position`)
    }

    set Y(y)
    {
        throw new Error(`${this.__name}.Y cannot be defined. Change ${this.__name}.Position`)
    }

    set Position(vector)
    {
        if(vector?.TypeOf !== 'Vector2D')
        {
            throw new TypeError(`"SET" -> "${this.__name}.Position" must be a Vector2D`)
        }

        this.__position = Vector2D.copy(vector)
    }

    set Width(width)
    {
        if(!Numeric.isNumber(width)) 
        {
            throw `Error: "${this.__name}.Width" defines a numeric value`

        }
        
        this.__width = width
    }

    set Height(height)
    {
        if(!Numeric.isNumber(height))
        {
            throw `Error: "${this.__name}.Height" defines a numeric value`
        } 
        
        this.__height = height
    }

    set CurrentSprite(currentSprite)
    {
        if(!Numeric.isNumber(currentSprite))
        {
            throw `Error: "${this.__name}.CurrentSprite" defines a numeric value`
        }

        this.__currentSprite = currentSprite
    }

    set Speed(speed)
    {

        if(speed?.TypeOf !== 'Vector2D')
        {
            throw new TypeError(`"SET" -> "${this.__name}.Speed" must be a Vector2D`)
        }

        this.__speed = Vector2D.copy(speed)
    }

    set Id(id)
    {
        if(!Numeric.isNumber(id))
        {
            throw new TypeError(`Error: "SET" -> "${this.__name}.Id" must be a number`)
        }

        this.__id = id
    }
    
    set Transform(transform)
    {
        if(!Numeric.isNumber(transform))
        {
            throw new TypeError(`"SET" -> "${this.__name}.Transform" must be a number`)
        }

        this.__transform = transform
    }

    set Enable(status)
    {
        if(typeof status !== 'boolean')
        {
            throw new TypeError(`"SET" -> "${this.__name}.Enable" must be a boolean`)
        }

        this.__enable = status
    }
    /**
     * 
     * @param {Object} coord "{x, y}": Sprite sheet coordinates 
     * @param {Number} sizeWidth Sprite size
     * @param {Number} sizeHeight Sprite size, default: sizeWidth
     */
    AddCoordSprite(coord, sizeWidth, sizeHeight = sizeWidth)
    {
        if( typeof(coord) !== 'object' || !isValidSpriteSheetCoordinates(coord?.x, coord?.y))
        {
            throw `Error: "${this.__name}.AddCoordSprite" defines a object value: {x, y}`
        }

        if( !Numeric.isNumber(sizeWidth) || !Numeric.isNumber(sizeHeight) )
        {
            throw new TypeError(`"SET" -> "${this.__name}.AddCoordSprite (objec, number, number)" must be a object and number`)
        }
        
        coord.sizeWidth  = sizeWidth
        coord.sizeHeight = sizeHeight

        this.__spriteSheetCoordinates.push(coord)
    }

}