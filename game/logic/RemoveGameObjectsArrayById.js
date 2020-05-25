import GameObject from "../../modules/gameObject/GameObject.js";

/**
 * 
 * @param {Array<GameObject>} gameObject reference to the gameObject
 * @param {number} id GameObject identification
 */
export default function browseTheArray(gameObject, id)
{
    for(var i = 0; i < [...gameObject].length; i++)
    {
        if(Array.isArray(gameObject[i]))
        {
            browseTheArray(gameObject[i], id)
            continue
        }

        if(id === gameObject[i].Id)
        {          
            gameObject.splice(i, 1)
            break
        }
        
    }
}
