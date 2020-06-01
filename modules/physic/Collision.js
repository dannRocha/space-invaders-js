import { GameObject } from '../mod.js'


export default class Collision 
{
    constructor()
    {
        throw 'class "Collision" must not be instantiated'
    }
    /**
     * 
     * @param {GameObject} gameObject1 
     * @param {GameObject} gameObject2 
     */
    static CollisionBetweenGameObject(item1, item2)
    {    
        return ( 
               ((item1.X + item1.Width) >= item2.X) 
            && (item1.X <= (item2.X + item2.Width))
            && (item1.Y <= (item2.Y + item2.Height)) 
            && ((item1.Y + item1.Height) >= item2.Y)
        )
    
    }

    static CollisionBetweenGameObjectAndMap()
    {


        return false
    }
}