import { Env } from '../../../modules/mod.js'
import { Actor } from '../../character/mod.js';

/**
 * 
 * @param {Array<Actor>} aliens
 * 
 * receives a copy of alien arrays and returns a new array
 * with changes in the position of the aliens.
 */
export default function moveAliens(aliens){
        
    if(!aliens.length) return []
    
    for(let lineOfAliens of aliens)
    {
        for(let alien of lineOfAliens)
        {
            alien.X += alien.Speed * alien.Sense
        }
    }


    let major = aliens[0][0].X
    let menor = aliens[0][0].X
    let index = [0, 0]

    for(let i = 0; i < aliens.length; ++i){
        if(major < aliens[i][aliens[i].length - 1].X) 
        {
            major = aliens[i][aliens[i].length - 1].X
            index[1] = i;
        }
        if(menor > aliens[i][0].X){
            menor = aliens[i][0].X
            index[0] = i;
        }
    }

    
    let last = aliens[index[1]].length - 1;

    if ( aliens[index[1]][last].X + aliens[index[1]][last].Width >= Env.Global.get('screen').width
      || aliens[index[0]][0].X <= 0
    )
    {
        // console.log(`first: ${}`)

        for(let lineOfAliens of aliens)
        {
            for(let alien of lineOfAliens)
            {
                alien.Y += alien.Height
                alien.Sense *= -1
            }
        }
    }
    
    return aliens
}