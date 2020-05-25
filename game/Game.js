import Actor from './character/Actor.js'
import Bullet from './character/Bullet.js'
import RemoveGameObjectsArrayById from './logic/RemoveGameObjectsArrayById.js'

import Control from '../modules/control/Control.js'
import Env from '../modules/utils/environment/Env.js'
import Figure from '../modules/figure/Figure.js'
import Game from '../modules/game/Game.js'
import GameObject from '../modules/gameObject/GameObject.js'
import Physic from '../modules/physic/Collision.js'
import Render from '../modules/render/Render.js'
import Numeric from '../modules/utils/numeric/Numeric.js'


let ship    = new Actor('Ship')
let boss    = new Actor('Boss')
let aliens  = new Array()
let defense = new Array()


function generateAliens()
{
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
                alien.Speed = 0.5

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
}

function generateDefense()
{
    /**
     * 
     * @param {number} positionX 
     * @param {number} positionY 
     */
    function createDefenseSection(positionX, positionY)
    {

        if(!Numeric.isNumber(positionX) || !Numeric.isNumber(positionY))
        {
            throw new TypeError('"generateDefense -> createDefenseSection", "positionX" and "positionY" must be number')
        }


        const section = []
        const QUANTITY_OF_LINES     = 3
        const QUANTITY_OF_COLUMNS   = 4

        
        let i = 0
        while (++i <= QUANTITY_OF_LINES)
        {
    
            let row = []
            let j = 0
            while(++j <= QUANTITY_OF_COLUMNS)
            {
                const block = new GameObject('Block')
                    block.Width     = 8
                    block.Height    = 8
                    block.X = (j * block.Width) + positionX
                    block.Y = (i * block.Height) + positionY
                    block.AddCoordSprite({x: 0, y: 0})
    
                row.push(block)
            }
    
            section.push(row)
        }
    
        return section
    }

    const sectionOne    = createDefenseSection(25, 170)
    const sectionTwo    = createDefenseSection(105, 170)
    const sectionThree  = createDefenseSection(180, 170)


    defense.push(sectionOne, sectionTwo, sectionThree)
}

async function setting()
{
    Env.Global.set('spritesheet', await Figure.LoadImage('../assets/img/invade.png'))
    Env.Global.set('score', 0)

        // SETTING HERO:SHIP
        ship.X = parseInt(Env.Global.get('screen').width / 2)
        ship.Y = parseInt(Env.Global.get('screen').height - 32)
        ship.Width = 8
        ship.Height= 8
        ship.Speed = 5
        ship.Score = -1_000
        ship.AddCoordSprite({x: 0, y: 8})

        // SETTING EMENY:BOSS
        boss.X = parseInt(Env.Global.get('screen').width)
        boss.Y = 10
        boss.Width = 8
        boss.Height= 8
        boss.Speed = 0.8
        boss.Sense = -1
        boss.Score = 1_000
        boss.AddCoordSprite({x: 24, y: 8})

        // SETTING EMENY:ALIENS
        generateAliens()

        // SETTING DEFENSE
        generateDefense()
        
        // SETTING JOYSTICK
        Control.AddEvent(Control.EVENTS.KEYDOWN, joystick)
        Control.AddEvent(Control.EVENTS.KEYUP, joystick)
}

async function startUp()
{

    const framePerSeconds = 30

    await setting()

    Game.Loop(() => main(), framePerSeconds)

}

function main()
{
    draw()
    update()
}

function draw()
{
    const contextCanvas = Env.Global.get('context')
    const spritesheet   = Env.Global.get('spritesheet')
    
    Render.BackgroundColor(contextCanvas, '#000')
    
    for(let lineOfAliens of aliens)
    {
        for(let alien of lineOfAliens)
        {
            Render.RenderGameObject(contextCanvas, spritesheet, alien)
        }
    }

    for(let sectionDefense of defense)
    {
        for(let lineOfBlocks of sectionDefense)
        {
            for(let block of lineOfBlocks)
            {
                Render.RenderGameObject(contextCanvas, spritesheet, block) 
            }
        }
    }
    
    for(const bullet of ship.Bullets)
    {
        Render.RenderGameObject(contextCanvas, spritesheet, bullet)
    }
    
    Render.RenderGameObject(contextCanvas, spritesheet, boss)
    Render.RenderGameObject(contextCanvas, spritesheet, ship)

    Render.Text
    (
        contextCanvas,                         // CONTEXT CANVAS
        { color: '#FFF', family: '7px serif'}, // FONT
        0, Env.Global.get('screen').width - 8, // POSITION
        `SCORE : ${Env.Global.get('score')}`   // MESSAGE
    )
}

function update()
{
    const MILLISECONDS      = 1_000
    const ROUTE_SIZE        = 300
    const ADJUST_TO_CENTER  = 120
    const DELTA_T           = Math.sin(Env.Global.get('clock').value / MILLISECONDS)
    
    if(ship.Speed) ship.X += ship.Speed * ship.Sense
    if(boss.Speed) boss.X = (DELTA_T * ROUTE_SIZE + ADJUST_TO_CENTER) * boss.Speed
    
    for(const bullet of [ ...ship.Bullets ])
    {
        bullet.Y -= bullet.Sense * bullet.Speed

        if(bullet.Y + bullet.Height < 0) ship.RemoveBullets()
        
        if(Physic.CollisionBetweenGameObject(boss, bullet))
        {
            boss.Speed = 0
            boss.X = Env.Global.get('screen').width
            RemoveGameObjectsArrayById(ship.Bullets, bullet.Id)
        }

        for(let sectionDefense of defense)
        {
            for(let lineOfBlocks of sectionDefense)
            {
                for(let block of lineOfBlocks)
                {
                    if(Physic.CollisionBetweenGameObject(bullet, block))
                    {
                        RemoveGameObjectsArrayById(ship.Bullets, bullet.Id)
                        RemoveGameObjectsArrayById(defense, block.Id)
                    }   
                }
            }
        }
    

        for(let lineOfAliens of [...aliens])
        {
            let check = false

            for(let alien of lineOfAliens)
            {
                if(Physic.CollisionBetweenGameObject(bullet, alien))
                {  
                    RemoveGameObjectsArrayById(ship.Bullets, bullet.Id)
                    RemoveGameObjectsArrayById(aliens, alien.Id)
                    
                    check = true
                    break
                }
            }

            if(check) break
        }
    }

}

function joystick(keycode, event)
{
    const SPACE_BETWEEN_BULLETS = 50

    //KEYDOWN
    if(event.type === Control.EVENTS.KEYDOWN && keycode === Control.Button.A) ship.Sense = -1
    if(event.type === Control.EVENTS.KEYDOWN && keycode === Control.Button.D) ship.Sense =  1
    
    //KEYUP
    if(event.type === Control.EVENTS.KEYUP && keycode === Control.Button.A) ship.Sense = 0
    if(event.type === Control.EVENTS.KEYUP && keycode === Control.Button.D) ship.Sense = 0
    
    // BULLETS KEY
    if (  event.type === Control.EVENTS.KEYDOWN && keycode === Control.Button.SPACEBAR
        ||event.type === Control.EVENTS.KEYDOWN && keycode === Control.Button.W
    )
    {   
        // ADD SPACE BETWEEN BULLETS
        if(ship.Bullets[ship.Bullets.length - 1]?.Y  + SPACE_BETWEEN_BULLETS > ship.Y)
        {
            return
        }


        const bullet = new Bullet('Bullet-Spaceship')
              bullet.X = ship.X
              bullet.Y = ship.Y
              bullet.Width  = 8
              bullet.Height = 8
              bullet.Speed =  8
              bullet.Sense =  1
              bullet.AddCoordSprite({x: 8, y: 8})

        ship.AddBullets(bullet)
    }
}

export default startUp
