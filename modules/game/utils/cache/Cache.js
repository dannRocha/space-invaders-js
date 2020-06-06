
export default class CacheGameObject
{
   constructor()
   {
        this.__cache = new Object()
   }
   /**
    * 
    * @param {String} key 
    * @param {Array} value 
    */
   createCache(value)
   {
        this.__cache[value[0].Name] = value.map(item => item.Id)
   }

   clearEmptyCache()
   {
        for(let key in this.__cache)
        {
            if(!this.__cache[key]?.length)
            {
                delete this.__cache[key]
            }
        }
   }
   /**
    * 
    * @param {String} key 
    */
   search(key)
   {
        return this.__cache[key]
   }

   get store()
   {
        return this.__cache
   }

}