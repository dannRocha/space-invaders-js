import { Env } from "../mod.js"

const statusButtons = {}


window.bt = statusButtons

export default class Control
{
    constructor()
    {
        throw new Error( 'class "Keyboard" must not be instantiated' )
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
     * @param {Document} target 
     */
    static addEvent(event, func, target)
    {
        
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
            throw new Error('"Control.EVENTS" events not authorized')
        }   
        

        target.addEventListener(event, e => {

            const key = e.key.toUpperCase()
    
            if(e.type === Control.EVENTS.KEYDOWN)
                statusButtons[key] = 1
            else if(e.type === Control.EVENTS.KEYUP)
                statusButtons[key] = 0
        } ) 
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
                throw new TypeError('"Control.isDown", only string')
            

            let status = !!Number( statusButtons[button.toUpperCase()] ) 
            
            if( status ) return status
        }
    }
}