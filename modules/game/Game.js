import Numeric from '../utils/numeric/Numeric.js'

export default class Game 
{
    constructor()
    {
        throw 'class "Game" must not be instantiated'
    }  

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
            globalThis.__clock = {...clock }
            
            func()
        
            requestAnimationFrame(__loop)
        }

        __loop()
        
    }
    
    static Setting(...functions)
    {
        for(const func of functions)
        {
            if(typeof(func) !== 'function')
                throw 'Error: "Game.Setting", you should only receive functions'

            func()
        }
    }

    static get DeltaTime(){
        return globalThis.__clock
    }
}