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
            value: 0.0
        }

        let now, elapsed
        let then = Date.now()
        let framesPerSecondsInterval = 1000 / framesPerSeconds
        let IDOfAnimation = null

        if(!func || typeof(func) !== 'function') throw '"Game.Loop" function receives a mandatory function as a parameter'
        if(!Numeric.isNumber(framesPerSeconds)) throw '"framesperseconds" in "Game.Loop" must be numeric'
        
        function __loop(timer)
        {
            
            clock.enable = running
            clock.value = timer
            Env.Global.set('clock', {...clock})
            
            IDOfAnimation = requestAnimationFrame(__loop)
            
            if(cancelRequestAnimationFrame)
            {
                cancelAnimationFrame(IDOfAnimation)
            }

            //Limit FPS
            now = Date.now()
            elapsed = now - then

            if(elapsed > framesPerSecondsInterval)
            {
                then = now - (elapsed % framesPerSecondsInterval)
                if(running)
                {
                    // running the game
                    func()
                }
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
}