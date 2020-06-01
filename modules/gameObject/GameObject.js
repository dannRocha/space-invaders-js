import { Numeric } from '../mod.js'

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
        this.__x = 0
        this.__y = 0
        this.__width = 0
        this.__height = 0
        this.__currentSprite = 0
        this.__spriteSheetCoordinates = []
        this.__speed = 0
        this.__id = Numeric.Random()
        if(!name){
            throw ERROR.ID
            
        }

        this.__name = name

        this.__typeOf = 'GameObject'

    }

    get X()
    {
        return this.__x
    }

    get Y()
    {
        return this.__y
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

    set X(x)
    {
        if(!Numeric.isNumber(x))
        {
            throw `Error: "${this.__name}.X" defines a numeric value`
        }
        
        this.__x = x
    }

    set Y(y)
    {
        if(!Numeric.isNumber(y)) 
        {
            throw `Error: "${this.__name}.Y" defines a numeric value`
        }
        
        this.__y = y
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
        if(!Numeric.isNumber(speed)) 
        {
            throw `Error: "${this.__name}.Speed" defines a numeric value`
        }

        this.__speed = speed
    }

    set Id(id)
    {
        if(!Numeric.isNumber(id))
        {
            throw new TypeError(`Error: "SET" -> "${this.__name}.Id" must be a number`)
        }

        this.__id = id
    }
    /**
     * @param {{x, y}} coord Object {x: 0, y: 0} 
     */
    AddCoordSprite(coord)
    {
        if(typeof(coord) !== 'object' || !isValidSpriteSheetCoordinates(coord?.x, coord?.y))
        {
            throw `Error: "${this.__name}.AddCoordSprite" defines a object value: {x, y}`
        }

        this.__spriteSheetCoordinates.push(coord)
    }

}