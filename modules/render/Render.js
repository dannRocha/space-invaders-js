import { GameObject, Numeric } from '../mod.js'

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

    /**
     * 
     * @param {CanvasRenderingContext2D} contextCanvas 
     * @param {HTMLImageElement} image 
     * @param {number} sx Internal X coordinate of the image
     * @param {number} sy Internal Y coordinate of the image
     * @param {number} sWidth Internal image width
     * @param {number} sHeight Internal image height
     * @param {number} dx X position of the image display
     * @param {number} dy Y position of the image display
     * @param {number} dWidth Image display width size 
     * @param {number} dHeight Image display height size
     */
    static drawPicture( contextCanvas, image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) 
    {
        if(!contextCanvas || !contextCanvas.canvas) 
            throw 'Error: "Render.DrawPicture" needs the canvas context to render'

        if(thereAreInvalidNumericValues(sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)) 
            throw 'Error: "Render.DrawPicture", "(sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)"  must be numeric values'

        if(!image || image?.tagName !== 'IMG') 
            throw 'Error: "Render.DrawPicture", a valid image must be passed'
        
            contextCanvas.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dWidth)

    }

    /**
     * 
     * @param {CanvasRenderingContext2D} contextCanvas 
     * @param {HTMLImageElement} spritesheet 
     * @param {GameObject} gameobject 
     * @param {number} scale 
     */
    static renderGameObject(contextCanvas, spritesheet, gameobject, scale = 1.0)
    {
        Render.drawPicture
        (
            contextCanvas, spritesheet,
            gameobject.SpriteSheetCoordinates[gameobject.CurrentSprite].x,
            gameobject.SpriteSheetCoordinates[gameobject.CurrentSprite].y,
            gameobject.Width, gameobject.Height, gameobject.X, gameobject.Y,
            gameobject.SpriteSheetCoordinates[gameobject.CurrentSprite].sizeWidth,
            gameobject.SpriteSheetCoordinates[gameobject.CurrentSprite].sizeHeight 
        )
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} contextCanvas 
     * @param {object} font Font configuration. Exemple: {color: '#FFF', family: '10pt serif'}
     * @param {number} x X coordinate of the text 
     * @param {number} y Y coordinate of the text
     * @param {string} text Message to be displayed 
     * 
     */
    static text(contextCanvas, font, x, y, text)
    {
        if(!contextCanvas || !contextCanvas.canvas) 
            throw 'Error: "Render.DrawPicture" needs the canvas context to render'
        
        contextCanvas.font = font.family
        contextCanvas.fillStyle = font.color
        contextCanvas.fillText(text, x, y)
            
    }
    /**
     * 
     * @param {CanvasRenderingContext2D} contextCanvas 
     * @param {string} color Hex color. Exemple: '#FFF'
     */
    static backgroundColor(contextCanvas, color)
    {
        contextCanvas.fillStyle = color
        contextCanvas.fillRect(0, 0, contextCanvas.canvas.width, contextCanvas.canvas.height)
    }

    static rect(contextCanvas, gameObject, color = '#FFF', lineWidth = 1)
    {

        contextCanvas.beginPath()
        contextCanvas.strokeStyle = color
        contextCanvas.lineWidth = lineWidth
        contextCanvas.rect(gameObject.X, gameObject.Y, gameObject.Width, gameObject.Height)
        contextCanvas.stroke()
    }

    static fillRect(contextCanvas, gameObject, color = '#FFF')
    {
        contextCanvas.fillStyle = color
        contextCanvas.fillRect(gameObject.X, gameObject.Y, gameObject.Width, gameObject.Height)
    }
}