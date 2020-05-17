import Numeric from '../utils/numeric/Numeric.js'
import Env from '../utils/environment/Env.js'

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
    static Loop(func, framesPerSeconds = 60, running = true, cancelRequestAnimationFrame = false)
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
    
    static get DeltaTime()
    {
        return Env.Global.get('clock')
    }
}