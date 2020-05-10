import Numeric from '../utils/numeric/Numeric.js'


function thereAreInvalidNumericValues(...parameters)
{
    for(const value of parameters)
    {
        if(!Numeric.isNumber(value)) return true
    }

    return false
}

export default class Render 
{
    constructor()
    {
        throw 'class "Render" must not be instantiated'
    }

    
    static DrawPicture( contextCanvas, image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) 
    {
        if(!contextCanvas || !contextCanvas.canvas) 
            throw 'Error: "Render.DrawPicture" needs the canvas context to render'

        if(thereAreInvalidNumericValues(sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)) 
            throw 'Error: "Render.DrawPicture", "(sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)"  must be numeric values'

        if(!image || image?.tagName !== 'IMG') 
            throw 'Error: "Render.DrawPicture", a valid image must be passed'
        
            contextCanvas.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dWidth)

    }

    static Text(contextCanvas, text, font)
    {
        if(!contextCanvas || !contextCanvas.canvas) 
            throw 'Error: "Render.DrawPicture" needs the canvas context to render'

            
    }

    static BackgroundColor(contextCanvas, color)
    {
        contextCanvas.fillStyle = color
        contextCanvas.fillRect(0, 0, contextCanvas.canvas.width, contextCanvas.canvas.height)
    }
}