export default class Env
{
    static get Global()
    {
        if(!globalThis.__env)
            globalThis.__env = {}

        return {
            set(key, value)
            {
                if(typeof(key) !== 'string')
                    throw 'Error: "Game.Global.set", "key" must be a string'

                globalThis.__env[key] = value
            },
            get(key)
            {
                if(!globalThis.__env[key] && globalThis.__env[key] !== 0)
                    throw 'Error: "Game.Global.get", "key" has not been defined'

                return globalThis.__env[key]
            }
        }
    }
}