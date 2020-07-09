import { Env } from "../mod.js"

const statusButtons = {
    SPACEBAR: 0,
    ENTER: 0,
    ARROWLEFT: 0,
    ARROWUP: 0,
    ARROWRIGHT: 0,
    ARROWDOWN: 0,
    A: 0, 
    C: 0, 
    D: 0, 
    S: 0,
    W: 0,
    X: 0,
    Z: 0 
}


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
            ARROWLEFT: 37, ARROWUP: 38,
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
    static addEvent(event, func, target)
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
            
            handleKeys(e.keyCode, e)
        
        })


        function handleKeys(keycode , event)
        {
            if(event.type === Control.EVENTS.KEYDOWN)
            {
                for(let key in Control.Button)
                {
                    if( Control.Button[key] === keycode)
                    {
                        statusButtons[key] = 1
                    }
                }
            }

            if(event.type === Control.EVENTS.KEYUP)
            {
                for(let key in Control.Button)
                {
                    if( Control.Button[key] === keycode)
                    {
                        statusButtons[key] = 0
                    }
                }
            }
        }     
    }

    /**
     * 
     * @param  {array<string>} buttons 
     */
    static isDown(...buttons)
    {
        for(let button of buttons)
        {

            if( typeof button !== 'string')
            {
                throw new TypeError('"Keyboard.isDown", only string')
            }
            
            status = statusButtons[button.toUpperCase()]
            
            if(status === undefined)
            {
                throw new Error('key is not found')
            }

            if(!!Number(status))
                return !!Number(status)
        }
    }
}