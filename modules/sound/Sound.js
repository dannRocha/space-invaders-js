export default class Sound
{
    constructor()
    {
        throw new Error('class "Sound" must not be instantiated')
    }
    /**
     * 
     * @param {string} src 
     */
    static LoadSound(src)
    {
        let sound = new Audio(src)
    
        return new Promise(( resolve, reject ) => {
            sound.addEventListener('canplay', e => {
                resolve(sound)
            })
        })
    }
}