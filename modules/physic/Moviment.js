export default class Moviment
{
    constructor()
    {
				throw new Error()	
    }

    static Approach(goal, current, deltaTime)
    {
        let difference = goal - current

        if( difference > deltaTime )
        {
            return current + deltaTime
        }

        if( difference < -deltaTime)
        {
            return current - deltaTime
        }

        return goal
    }
}
