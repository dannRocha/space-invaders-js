import { Search, GameObject } from '../../../modules/mod.js'

let cache = []
/**
 * 
 * @param {Array<GameObject>} aliens 
 * @param {Number} id 
 */
export default function searchGameObjectById(gameObjects, id)
{
    // if(inc)       
    // cache.push( ...gameObjects.map(gameObject => gameObject.Id) )
    // window.acc = cache
    return Search.binary(gameObjects.map(gameObject => gameObject.Id), id)

}