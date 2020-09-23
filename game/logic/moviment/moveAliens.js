import { Env, Vector2D, Search } from '../../../modules/mod.js'
import { Actor } from '../../character/mod.js';

/**
 * 
 * @param {Array<Actor>} aliens
 * @param {number} aliens
 * 
 * receives a copy of alien arrays and returns a new array
 * with changes in the position of the aliens.
 */
export default function moveAliens(aliens, deltaTime){
    
    if(!aliens.length) return []
    
    let last  = aliens[0]
    let first = aliens[0]
    	
    for(let alien of aliens)
    {
        if(alien.X > last.X)    last = alien
        if(alien.X < first.X)   first = alien

        alien.Position = Vector2D.sum(
            alien.Position,
            Vector2D.scale(Vector2D.scale(alien.Speed, alien.Sense), deltaTime)
        )
        
        alien.Speed = new Vector2D(35, 0)
    }


    if(last.X + last.Width > Env.Global.get('screen').width)
        for(let alien of aliens)
        {
            alien.Sense = new Vector2D(-1, 1)
            alien.Speed = new Vector2D(alien.Speed.X, alien.Height**3)
        }

    if(first.X < 0)
        for(let alien of aliens)
        {
            alien.Sense = new Vector2D( 1, 1)
            alien.Speed = new Vector2D(alien.Speed.X, alien.Height**3)
        }
}
