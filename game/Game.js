import { Actor, Bullet } from './character/mod.js'
import { generateAliens, generateDefense } from './logic/generators/mod.js'
import { moveAliens } from './logic/moviment/mod.js'

import { Collision, Control, Env, Figure, Game, Render, Vector2D } from '../modules/mod.js'


let ship    = new Actor('Ship')
let boss    = new Actor('Boss')
let aliens  = new Array()
let defense = new Array()
let alienBullets = new Array()
    

async function setting()
{
    Env.Global.set('spritesheet', await Figure.LoadImage('../assets/img/invaders.png'))
    Env.Global.set('score', 0)

        // SETTING HERO:SHIP
        ship.Position = new Vector2D(
            Env.Global.get('screen').width  / 2, 
            Env.Global.get('screen').height - 32
        )
        ship.Width = 8
        ship.Height= 8
        ship.Speed = new Vector2D(5, 0)
        ship.Lives = 3
        ship.Score = -1_000
        ship.AddCoordSprite({x: 0, y: 8}, 8)

        // SETTING EMENY:BOSS
        boss.Position = new Vector2D(
            Env.Global.get('screen').width, 
            10
        )
        boss.Width = 8
        boss.Height= 8
        boss.Speed = new Vector2D( 8, 0)
        boss.Sense = new Vector2D(-1, 0)
        boss.Lives = 2
        boss.Score = 1_000
        boss.AddCoordSprite({x: 24, y: 8}, 8)

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
    
    for(let alien of aliens)
    {
        Render.RenderGameObject(contextCanvas, spritesheet, alien)
    }

    for(let block of defense)
    {
        Render.RenderGameObject(contextCanvas, spritesheet, block) 
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
        
    // aliens = moveAliens(aliens)

    if(ship.Sense.X || ship.Sense.Y)
    {
        ship.Position = Vector2D.sum(
            ship.Position,
            Vector2D.scale(ship.Speed, ship.Sense)
        )
    }
    
    if(boss.Sense.X || boss.Sense.Y)
    {
        boss.Position = Vector2D.sum(
            boss.Position, 
            Vector2D.scale(boss.Speed, boss.Sense)
        )
        if(boss.X < 0 || boss.X > Env.Global.get('screen').width - boss.Width)
            boss.Sense = Vector2D.scale(boss.Sense, new Vector2D(-1, 0))

    }


    for(const bullet of [ ...ship.Bullets ])
    {
        
        bullet.Position = Vector2D.sum( 
            bullet.Position, 
            Vector2D.scale(bullet.Speed, bullet.Sense )
        )
        
        if(bullet.Y + bullet.Height < 0) ship.RemoveBullets()
        
        if(Collision.CollisionBetweenGameObject(boss, bullet))
        {
            boss.Lives--
            if(!boss.Lives)
            {
                boss.Speed = new Vector2D(0, 0)
                boss.Position = new Vector2D(Env.Global.get('screen').width)
            }

            Game.removeGameObjectArrayById(ship.Bullets, bullet.Id)
        }

        for(let block of defense)
        {
            if(Collision.CollisionBetweenGameObject(bullet, block))
            {   
                block.Resistance--
                block.CurrentSprite--
                if(!block.Resistance)
                {
                    Game.removeGameObjectArrayById(defense, block.Id)
                }
                
                Game.removeGameObjectArrayById(ship.Bullets, bullet.Id)
            }   
        }
    

        for(let alien of aliens)
        {
            if(Collision.CollisionBetweenGameObject(bullet, alien))
            {
                Game.removeGameObjectArrayById(ship.Bullets, bullet.Id)
                Game.removeGameObjectArrayById(aliens, alien.Id)
                break
            }
        }    
    }
    

    for(const bullet of alienBullets)
    {
        // bullet.Y += bullet.Sense * bullet.Speed
        bullet.Position = Vector2D.sum(
            bullet.Position, 
            Vector2D.scale(bullet.Speed, bullet.Sense)
        )

        // Remove bullet when leaving the canvas boundaries
        if(bullet.Y >= Env.Global.get('screen').height)
        {
            Game.removeGameObjectArrayById(alienBullets, bullet.Id)
        }

        // Check collision with alien bullets and spaceship
        if(Collision.CollisionBetweenGameObject(bullet, ship))
        {
            Game.removeGameObjectArrayById(alienBullets, bullet.Id)
        }

        // Check collision with alien bullets and defense
        for(let block of defense)
        {
            if(Collision.CollisionBetweenGameObject(bullet, block))
            {
                Game.removeGameObjectArrayById(alienBullets, bullet.Id)
                block.Resistance--
                block.CurrentSprite--

                if(!block.Resistance)
                {
                    Game.removeGameObjectArrayById(defense, block.Id)
                }
                
            }   
        }
    }

}

function joystick(keycode, event)
{
    const SPACE_BETWEEN_BULLETS = 50
    window.ship = ship
    //KEYDOWN
    if(event.type === Control.EVENTS.KEYDOWN && keycode === Control.Button.A)
        ship.Sense = new Vector2D(-1, 0)

    if(event.type === Control.EVENTS.KEYDOWN && keycode === Control.Button.D) //ship.Sense =  1
        ship.Sense = new Vector2D( 1, 0)

    //KEYUP
    if(event.type === Control.EVENTS.KEYUP && keycode === Control.Button.A) 
        ship.Sense = Vector2D.scale(ship.Sense, 0)
       
    if(event.type === Control.EVENTS.KEYUP && keycode === Control.Button.D) 
        ship.Sense = Vector2D.scale(ship.Sense, 0)
        
    
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
            bullet.Position = new Vector2D(ship.X + 2, ship.Y)
            bullet.Width  = 4
            bullet.Height = 8
            bullet.Speed = new Vector2D(0, 8)
            bullet.Sense = new Vector2D(0, -1)
            bullet.AddCoordSprite({x: 10, y: 8}, 4, 8)

        ship.AddBullets(bullet)
    }

    if( event.type === Control.EVENTS.KEYDOWN && keycode === Control.Button.X )
    {

        if( !aliens.length ) return

        let index = parseInt(Math.random() * aliens.length)
        
        let bullet = new Bullet('Bullet-Aliens')
            bullet.Position = new Vector2D(
                aliens[index].X, 
                aliens[index].Y
            )
            bullet.Width  =  3
            bullet.Height =  8
            bullet.Speed  =  new Vector2D(0, 8)
            bullet.Sense  =  new Vector2D(0, 1)
            bullet.AddCoordSprite({x: 16, y: 8}, 8)

            alienBullets.push(bullet)

    }
}

export default startUp
