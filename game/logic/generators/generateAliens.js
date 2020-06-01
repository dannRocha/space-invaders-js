import { Actor } from '../../character/mod.js'

/**
 * Creates and configures alien 'Actors'
 */
export default function generateAliens()
{
    let aliens= []
    let score = 10
    const COLL = 18
    const ROWS = 6

    const coord = {x: 0, y: 0}
    const coordSprite = {x: 0, y: 0}


    let row = 0
    while(++row <= ROWS)
    {
        const emeny = []
        const margin= 1.5
        const spaceBetween = 30

        coord.x = 0

        let coll = 0
        while(++coll <= COLL)
        {
            const alien = new Actor('Alien')

                // SETTING EMENY:ALIEN
                alien.X = coord.x * margin
                alien.Y = coord.y * margin + spaceBetween
                alien.Width  = 8
                alien.Height = 8
                alien.Score = score
                alien.Speed = 1
                alien.Sense = 1

                // Sprite mapping: sprite 1
                alien.AddCoordSprite
                (
                    {
                        x: coordSprite.x * 2,
                        y: coordSprite.y
                    }
                )
                // Sprite mapping: sprite 2
                alien.AddCoordSprite
                (
                    {
                        x: (row * 16 - 8),
                        y: coordSprite.y
                    }
                )

            emeny.push(alien)

            coord.x += 8

        }

        coord.y += 8
        coordSprite.x += 8

        score += 5
        aliens.push([...emeny])
    }

    return aliens
}