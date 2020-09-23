import { Env, GameObject, Numeric, Search} from '../mod.js'
import { CacheGameObject } from './utils/mod.js'

const cache = new CacheGameObject()

export default class Game 
{
    constructor()
    {
        throw 'class "Game" must not be instantiated'
    }  
    
    /**
     * 
     * @param {function} func func Game loop function
     * @param {number} framesPerSeconds Number of frames per second to be executed
     * @param {boolean} running Racing game function control 
     * @param {boolean} cancelRequestAnimationFrame Control of the RequestAnimationFrame function
     */   
    static loop(func, framesPerSeconds = 60, running = true, cancelRequestAnimationFrame = false)
    {   
        let clock = {
            enable: false, 
            value: 0.0,
            deltaTime: 0.0,
        }
        
        Env.Global.set( 'framespersecons', framesPerSeconds )

        let now, elapsed
        let then = window.performance.now()
        let framesPerSecondsInterval = 1000 / framesPerSeconds
        let IDOfAnimation = null
        let end = window.performance.now()
        let start = 0
        let deltaTime = 0

        if(!func || typeof(func) !== 'function') throw '"Game.Loop" function receives a mandatory function as a parameter'
        if(!Numeric.isNumber(framesPerSeconds)) throw '"framesperseconds" in "Game.Loop" must be numeric'
        
        function __loop(timer)
        {
            
            clock.enable = running
            clock.value = timer
            clock.deltaTime = deltaTime
            Env.Global.set('clock', {...clock})
            
            IDOfAnimation = requestAnimationFrame(__loop)
            
            if(cancelRequestAnimationFrame)
            {
                cancelAnimationFrame(IDOfAnimation)
            }

            //Limit FPS
            now = window.performance.now()
            elapsed = now - then

            if(elapsed > framesPerSecondsInterval)
            {
                then = now - (elapsed % framesPerSecondsInterval)

                start = end
                end = window.performance.now()
                
                if(running)
                {
                    // running the game
                    func()
                }

                deltaTime = (end - start) / 1_000

            }

        }

        requestAnimationFrame(__loop)        
    
    }


    /**
     * 
     * @param {Array<GameObject>} gameObject reference to the gameObject
     * @param {number} id GameObject identification
     * 
     */
    static removeGameObjectArrayById(gameObject, id)
    {
        if(!gameObject.length) return
        
        let key = gameObject[0].Name 
        
        if(!cache.search(key) || !cache.search(key).length)
        {
            cache.createCache(gameObject)
        }


        let index = Search.binary(cache.search(key), id)
    
        gameObject.splice(index, 1)
        cache.store[key].splice(index, 1)
    }

    /**
     * 
     * @param {Array<GameObject>} gameObjects 
     * @param {Number} id 
     * @param {Boolean} status 
     */
    static enableOrDisableGameObjectArrayByID(gameObjects, id, status)
    {
        if( typeof status !== 'boolean' 
            || !Array.isArray(gameObjects)
            || !Numeric.isNumber(id) 
        )
        {
            throw new TypeError(`"Game.enableOrDisableGameObjectArrayByID(objec, number, number)" must be a object and number`)
        }

        if(!gameObject.length) return
        
        let key = gameObject[0].Name 
        
        if(!cache.search(key) || !cache.search(key).length)
        {
            cache.createCache(gameObject)
        }


        let index = Search.binary(cache.search(key), id)
    
        gameObjects[index].Enable = status
        
    }


    /**
     * 
     * @param {function} func 
     * @param {number} time seconds
     */
    static setInterval(func, time )
    {

        const MILLISECONDS = 1_000

        if( typeof func !== 'function' )
        {
            throw new TypeError('"Game.setInterval": arg: func must be a function')
        }


        if( !Numeric.isNumber( time ) )
        {
            throw new TypeError('"Game.setInterval": arg: time must be a number' )
        }

        
        if( !Env.Global.wasDefined('interval') )
        {
            Env.Global.set('interval', false )
        }
        

        if( !Env.Global.get('interval') ) 
        {
            Env.Global.set('interval', true )

            setTimeout(args => {
                func( args )

                Env.Global.set('interval', false )
            }, MILLISECONDS * time )
        }

    }

    /**
     * 
     * @param {Number} time seconds 
     */
    static delay(time)
    {
        const DATE = Date.now()
        const MILLISECONDS = 1_000
        
        let curretDate = null

        do{ 
            curretDate = Date.now() 
        }
        while(curretDate - DATE < MILLISECONDS * time)

    }

    /**
     * 
     */
    static get DeltaTime()
    {
        return Env.Global.get('clock')
    }

    static get FramesPerSeconds()
    {
        return Env.Global.get('framespersecons')
    }

}
