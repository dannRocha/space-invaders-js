export default class Env
{
    static get Global()
    {
        if(!globalThis.__env)
            globalThis.__env = {}

        return {

            /**
             * 
             * @param {string} key 
             * @param {any} value 
             */
            set( key, value )
            {
                if( typeof key !== 'string')
                {
                    throw new TypeError( 'Error: "Game.Global.set", "key" must be a string' )
                }

                globalThis.__env[key] = value
            },


            /**
             * 
             * @param {string} key 
             */
            get( key )
            {
                if( !globalThis.__env[key] 
                    && globalThis.__env[key] !== 0
                    && typeof globalThis.__env[key] !== 'boolean' 
                )
                {
                    throw new Error( '"Game.Global.get", "key" has not been defined' )
                }

                return globalThis.__env[key]
            },
            

            /**
             * 
             * @param {string} key 
             */
            wasDefined( key )
            {
                return !!globalThis.__env[key] && globalThis.__env[key] !== 0
            } 
        }
    }
}