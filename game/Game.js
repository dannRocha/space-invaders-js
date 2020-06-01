import { Actor, Bullet } from './character/mod.js'
import { generateAliens, generateDefense } from './logic/generators/mod.js'
import moveAliens from './logic/moviment/moveAliens.js'
import RemoveGameObjectsArrayById from './logic/mechanics/RemoveGameObjectsArrayById.js'

import { Collision, Control, Env, Figure, Game, Render } from '../modules/mod.js'


let ship    = new Actor('Ship')
let boss    = new Actor('Boss')
let aliens  = new Array()
let defense = new Array()
let alienBullets = new Array()
    

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
        ship.Lives = 3
        ship.Score = -1_000
        ship.AddCoordSprite({x: 0, y: 8})

        // SETTING EMENY:BOSS
        boss.X = parseInt(Env.Global.get('screen').width)
        boss.Y = 10
        boss.Width = 8
        boss.Height= 8
        boss.Speed = 0.8
        boss.Sense = -1
        boss.Lives = 2
        boss.Score = 1_000
        boss.AddCoordSprite({x: 24, y: 8})

        // SETTING EMENY:ALIENS
        aliens  = generateAliens() 
        
        // SETTING DEFENSE
        defense = generateDefense()
        
        
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

    for(const bullet of alienBullets)
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
    const MILLISECONDS      = 2_000
    const ROUTE_SIZE        = 300
    const ADJUST_TO_CENTER  = 120
    const DELTA_T           = Math.sin(Env.Global.get('clock').value / MILLISECONDS)
        
    aliens = moveAliens(aliens)


    if(ship.Speed) ship.X += ship.Speed * ship.Sense
    if(boss.Speed) boss.X = (DELTA_T * ROUTE_SIZE + ADJUST_TO_CENTER) * boss.Speed


    for(const bullet of [ ...ship.Bullets ])
    {
        bullet.Y += bullet.Sense * bullet.Speed

        if(bullet.Y + bullet.Height < 0) ship.RemoveBullets()
        
        if(Collision.CollisionBetweenGameObject(boss, bullet))
        {
            boss.Lives--
            if(!boss.Lives)
            {
                boss.Speed = 0
                boss.X = Env.Global.get('screen').width
            }

            RemoveGameObjectsArrayById(ship.Bullets, bullet.Id)
        }

        for(let sectionDefense of defense)
        {
            for(let lineOfBlocks of sectionDefense)
            {
                for(let block of lineOfBlocks)
                {
                    if(Collision.CollisionBetweenGameObject(bullet, block))
                    {   
                        block.Resistance--
                        if(!block.Resistance)
                        {
                            RemoveGameObjectsArrayById(defense, block.Id)
                        }
                        
                        RemoveGameObjectsArrayById(ship.Bullets, bullet.Id)
                    }   
                }
            }
        }
    

        for(let lineOfAliens of aliens)
        {
            let check = false

            for(let alien of lineOfAliens)
            {

                if(Collision.CollisionBetweenGameObject(bullet, alien))
                {  
                    RemoveGameObjectsArrayById(ship.Bullets, bullet.Id)
                    RemoveGameObjectsArrayById(aliens, alien.Id)
                    
                    if(!lineOfAliens.length)
                    {
                        aliens = aliens.filter(line => !!line.length)
                       
                    }

                    check = true

                    break
                }
            }

            if(check) break
        }
    }
    

    for(const bullet of alienBullets)
    {
        bullet.Y += bullet.Sense * bullet.Speed


        // Remove bullet when leaving the canvas boundaries
        if(bullet.Y >= Env.Global.get('screen').height)
        {
            RemoveGameObjectsArrayById(alienBullets, bullet.Id)
        }

        // Check collision with alien bullets and spaceship
        if(Collision.CollisionBetweenGameObject(bullet, ship))
        {
            RemoveGameObjectsArrayById(alienBullets, bullet.Id)
        }

        // Check collision with alien bullets and defense
        for(let sectionDefense of defense)
        {
            for(let lineOfBlocks of sectionDefense)
            {
                for(let block of lineOfBlocks)
                {
                    if(Collision.CollisionBetweenGameObject(bullet, block))
                    {
                        RemoveGameObjectsArrayById(alienBullets, bullet.Id)
                        block.Resistance--

                        if(!block.Resistance)
                        {
                            RemoveGameObjectsArrayById(defense, block.Id)
                        }
                        
                    }   
                }
            }
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


        let bullet = new Bullet('Bullet-Spaceship')
            bullet.X = ship.X
            bullet.Y = ship.Y
            bullet.Width  = 8
            bullet.Height = 8
            bullet.Speed =  8
            bullet.Sense =  -1
            bullet.AddCoordSprite({x: 8, y: 8})

        ship.AddBullets(bullet)
    }

    if( event.type === Control.EVENTS.KEYDOWN && keycode === Control.Button.X )
    {

        if( !aliens.length ) return

        let axisX = Math.floor(Math.random() * aliens.length)
        let axisY = Math.floor(Math.random() * aliens[axisX].length)

        
        
        let bullet = new Bullet('Bullet-Aliens')
            bullet.X = aliens[axisX][axisY].X
            bullet.Y = aliens[axisX][axisY].Y
            bullet.Width  =  8
            bullet.Height =  8
            bullet.Speed  =  8
            bullet.Sense  = 1
            bullet.AddCoordSprite({x: 8, y: 8})

            alienBullets.push(bullet)

    }
}

export default startUp
