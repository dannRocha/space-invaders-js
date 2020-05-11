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
     * @param {function} func Game loop function
     * @param {number} framesPerSeconds Number of frames per second to be executed
     */
    static Loop(func, framesPerSeconds = 60)
    {   
        let clock = {
            enable: false, 
            value: 0.0
        }


        if(!func || typeof(func) !== 'function') throw '"Game.Loop" function receives a mandatory function as a parameter'
        if(!Numeric.isNumber(framesPerSeconds)) throw '"framesperseconds" in "Game.Loop" must be numeric'
        
        function __loop(timer)
        {
            
            clock.enable = true
            clock.value = timer

            Env.Global.set('clock', {...clock})
            
            func()
        
            requestAnimationFrame(__loop)
        }

        __loop()
        
    }
    
    static get DeltaTime()
    {
        return Env.Global.get('clock')
    }
}