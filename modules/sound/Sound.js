var handleSound = {
    set: async (target, key, value) => {
        
        if(!!target[key])
            throw new Error('')
        // console.log(await value)
        target[key] = await value

        return true
    },

    get: ( target, key ) => {
        
        return target[key]
    }
}

export default class Sound
{
    constructor()
    {
        this.__size = 0

        this.__sounds = new Proxy( {}, handleSound )
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
    /**
     * 
     * @param {string} key 
     * @param {Promise<Sound>} value 
     */
    set(key, value)
    {
        this.__size += 1
        this.__sounds[key] = value       
    }

    get(key)
    {

        return this.__sounds[key]
    }

    isLoad()
    {
        
        return false
    }
}