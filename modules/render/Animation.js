import { GameObject, Numeric, Game } from "../mod.js";

export default class Animation
{
    constructor()
    {

    }


    /**
     * 
     * @param {GameObject} actor 
     * @param {number} time 
     * @param {function} func 
     * @param  {...any} args 
     */
    static run(actor, time, func = null, ...args )
    {
        if( !Numeric.isNumber( time ) )
        {
            throw new Error('"Animation.run": time no pass or time not a number' )
        }

        if( actor.Time === null )
            actor.Time = time

        actor.CurrentFrame += ( actor.Time / ( Game.FramesPerSeconds  * ( actor.Time** 2 ))) 
        actor.CurrentSprite = Math.floor(actor.CurrentFrame % actor.NumberOfSprites )

        if( func !== null && actor.CurrentSprite === actor.NumberOfSprites - 1 )
        {
            if( typeof func !== 'function' )
            {
                throw new TypeError( '"Animation.run": arg: func must be a function' )
            }

            func( args )
            actor.CurrentFrame = 0
            actor.CurrentSprite = 0
        }

    }

}