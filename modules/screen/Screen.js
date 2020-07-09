import { Env, Numeric, Control } from '../mod.js'

export default class Screen 
{
    /**
     * Canvas instance on page
     * @constructor
     * @param {number} width - Canvas width -> Default value 840.
     * @param {number} height - Canvas height -> Default value 480.
     * @param {string} name - Canvas identification -> "Screen".
     */
    constructor(width = 840, height = 480, name = 'Screen')
    {
        this.X = 0
        this.Y = 0
        this.Width = width
        this.Height = height

        // Creation of canvas and definition of properties
        this.__canvas = document.createElement('canvas')
        this.__canvas.setAttribute('id', name)
        this.__canvas.style.width = width
        this.__canvas.style.height = height
       
        // Pixel density
        this.__canvas.width = width
        this.__canvas.height = height

        // context canvas
        this.__context = this.__canvas.getContext('2d')
        this.Context.fillStyle= '#000'
        this.Context.fillRect(0, 0, this.Width, this.Height)

        document.body.appendChild(this.__canvas)

        this.__identification = Symbol('canvas')

        Control.addEvent(Control.EVENTS.KEYDOWN, ()=>{}, globalThis)
        Control.addEvent(Control.EVENTS.KEYUP,   ()=>{}, globalThis)
        Control.addEvent(Control.EVENTS.KEYPRESS,()=>{}, globalThis)

        Env.Global.set('canvas', this.Canvas)

        Env.Global.set('context', this.Context)
        
        Env.Global.set('screen', {
            width: this.__canvas.width, 
            height: this.__canvas.height
        })
        
        Env.Global.set('debbuger', {
            collision: false,
            outline: false,
            console: false
        })
    }


    get X()
    {
        return this.__x
    }

    get Y()
    {
        return this.__y
    }

    get Width()
    {
        return this?.__canvas?.width ?? this.__width
    }

    get Height()
    {
        return this?.__canvas?.height ?? this.__height
    }
    
    set X(x)
    {
        if(!x && x !== 0) throw 'Error: "Screen.X", undefined value'
        if(!Numeric.isNumber(x)) throw 'Error: "Screen.X" defines a numeric value'

        this.__x = x;
    }
    
    set Y(y)
    {
        if(!y && y !== 0) throw 'Error: "Screen.Y", undefined value'
        if(!Numeric.isNumber(y)) throw 'Error: "Screen.Y" defines a numeric value'

        this.__y = y
    }

    set Width(width)
    {
        if(!width) throw 'Error: "Screen.Width", undefined value'
        if(!Numeric.isNumber(width)) throw 'Error: "Screen.Width" defines a numeric value'

        this.__width = width
        
        Env.Global.set("screen", { width: this.Width, height: this.Height })

    }

    set Height(height)
    {
        if(!height) throw 'Error: "Screen.Height", undefined value'
        if(!Numeric.isNumber(height)) throw 'Error: "Screen.Height" defines a numeric value'

        this.__height = height
        
        Env.Global.set("screen", { width: this.Width, height: this.Height })

    }

    get Context()
    {
        return this.__context
    }

    get Canvas()
    {
        return this.__canvas
    }

    set PixelDensityOfWidth(width)
    {
        if(!width) throw 'Error: "Screen.PaddingPixelWidth", undefined value'
        if(!Numeric.isNumber(width)) throw 'Error: "Screen.PaddingPixelWidth" defines a numeric value'
        
        this.__canvas.width = width

        Env.Global.set('screen', {width: this.__canvas.width, height: this.__canvas.height})
    
    }

    set PixelDensityOfHeight(height)
    {
        if(!height) throw 'Error: "Screen.PaddingPixelHeight", undefined value'
        if(!Numeric.isNumber(height)) throw 'Error: "Screen.PaddingPixelHeight", defines a numeric value'

        this.__canvas.height = height
        
        Env.Global.set('screen', {width: this.__canvas.width, height: this.__canvas.height})
        
    }

    get Type()
    {
        return this.__identification
    }

    /**
     * Returns a canvas with parameter-defined ID
     * @static 
     * @param {string} name ID of Canvas -> Default value "Screen"
     *  
     */
    static Canvas(name = 'Screen')
    { 
        return document.getElementById(name) 
    }
    
}