export default class Figure
{
    constructor()
    {
        throw 'class "Figure" must not be instantiated'
    }
    /**
     * 
     * @param {string} src Image path 
     */
    static loadImage(src)
    {
        if(typeof(src) !== 'string') 
            throw 'Error: "Figure.loadImage" must be a string with the image path'

        return new Promise((resolve, reject) => {
            
            let image = new Image()
                image.src = src
            
            image.onload = () => {
                resolve(image)
            }
            image.onerror = (err) => {
                reject(`Error: "Figure.loadImage", error when loading image. Path:${src}`)
            }
        })
    }
}