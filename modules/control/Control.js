
export default class Control
{
    constructor()
    {
        throw 'class "Keyboard" must not be instantiated'
    }

    static get Button()
    {
        return {
            SPACEBAR: 32, ENTER: 13,
            ARROWLEFT: 37, ARROWTOP: 38,
            ARROWRIGHT: 39, ARROWDOWN: 40,
            A: 65, C: 67, D: 68, 
            S: 83, W: 87, X: 88, Z: 90 
        }
    }

    static get EVENTS()
    {
        return {
            KEYDOWN: 'keydown',
            KEYUP: 'keyup',
            KEYPRESS: 'keypress'
        }
    }
    /**
     * 
     * @param {string} event 
     * @param {function} func 
     */
    static AddEvent(event, func)
    {
        
        if(!!globalThis.__keyboardEventSetup)
        {
            globalThis.__keyboardEventSetup = {down: false, up: false }
        }
        
        if(typeof(event) !== 'string') 
        {
            throw new TypeError('')
        }   
            
        if(typeof(func) !== 'function')
        {
            throw new TypeError('')
        }
        
        event = event.toLowerCase()
        
        if( Control.EVENTS.KEYDOWN !== event 
            && Control.EVENTS.KEYUP !== event 
            && Control.EVENTS.KEYPRESS !== event
        )
        {
            throw 'Error: "Control.EVENTS" events not authorized'
        }   
        

        globalThis.addEventListener(event, e => {
            
            e.preventDefault()

            func(e.keyCode, e)
        })
        
    }
}