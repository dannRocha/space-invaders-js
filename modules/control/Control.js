export default class Control
{
    constructor()
    {
        throw 'class "Keyboard" must not be instantiated'
    }

    static get Joystick()
    {
        return {
            ARROWLEFT: 37, ARROWTOP: 38,
            ARROWRIGHT: 39, ARROWDOWN: 40,
            A: 65, C: 67, D: 68, 
            S: 83, X: 88,  Z: 90 
        }
    }

    static get EVENTS()
    {
        return {
            KEYDOWN: 'keydown',
            KEYUP: 'keyup'
        }
    }

    static AddEvent(event, func)
    {
        
        if(!!globalThis.__keyboardEventSetup)
        globalThis.__keyboardEventSetup = {down: false, up: false }
        
        if(typeof(event) !== 'string') 
        {
            throw ''
        }   
            
        if(typeof(func) !== 'function')
        {
            throw ''
        }
        
        event = event.toLowerCase()
        
        if( Control.EVENTS.KEYDOWN !== event && Joystick.EVENTS.KEYUP !== event )
        {
            throw 'Error: "Joystick.EVENTS" events not authorized'
        }   
        

        globalThis.addEventListener(event, e => {
            
            e.preventDefault()

            func(e.keyCode, e)
        })
        
    }
}