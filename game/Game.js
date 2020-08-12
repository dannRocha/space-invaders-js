import { Actor, Bullet } from './character/mod.js'
import { generateAliens, generateDefense } from './logic/generators/mod.js'
import { moveAliens } from './logic/moviment/mod.js'

import { Collision, Control, Env, Figure, Game, Render, Vector2D, GameObject, Animation } from '../modules/mod.js'

let ship = new Actor('Ship')
let boss = new Actor('Boss')
let explosion = new Actor('Explosion')
let aliens = new Array()
let defense = new Array()
let alienBullets = new Array()
let sound = new Object();
let score = 0
let stage = 0
let pause = false
let controlTime = false



async function setup()
{
    Env.Global.set('spritesheet', await Figure.loadImage('../assets/img/invaders.png'))

    sound.laser = new Howl({
        src: [ '/assets/sound/laser_spaceship.wav', ],
        sprite: { 'laser': [0, 100, ], }
    })

    sound.explosion = new Howl({
        src: ['/assets/sound/atari_boom3.wav', ],
        sprite: { 'explosion-alien': [100, 800], }
    })

    sound.background = new Howl({
        src: ['/assets/sound/background_sound0.ogg'],
        autoplay: true,
        loop: true,
    })


    score = 0
    
    sound.background.play()

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
        ship.addCoordSprite({x: 0, y: 8}, 8)


        // SETTING EMENY:BOSS
        boss.Position = new Vector2D( Env.Global.get('screen').width, 10 )
        boss.Width = 8
        boss.Height= 8
        boss.Speed = new Vector2D( 8, 0)
        boss.Sense = new Vector2D(-1, 0)
        boss.Lives = 1
        boss.Score = 1_000
        boss.addCoordSprite({x: 24, y: 8}, 8 )

        
        // SETTING EFFECT:EXPLOSION
        explosion.Width = 8
        explosion.Height = 8
        explosion.Lives = 0
        explosion.Position = new Vector2D(-10, 0)

        for( let i = 1; i <= 6; i++ )
            explosion.addCoordSprite({x: 24 + ( explosion.Width * i ), y: explosion.Width}, explosion.Width )
        


        // SETTING EMENY:ALIENS
        aliens  = generateAliens() 
        
        // SETTING DEFENSE
        defense = generateDefense()
        
}

async function init()
{

    const framePerSeconds = 30

    await setup()

    Game.loop(() => main(), framePerSeconds)

}

function main()
{
    joystick()
    draw()

    if( !pause )
    {
        logic()
        update()
    }
}


function draw()
{
    const contextCanvas = Env.Global.get('context')
    const spritesheet   = Env.Global.get('spritesheet')

    
    Render.backgroundColor(contextCanvas, '#000')

    
    for(const alien of aliens)
    {
        Render.renderGameObject(contextCanvas, spritesheet, alien)
    }


    for(const block of defense)
    {
        Render.renderGameObject(contextCanvas, spritesheet, block) 
    }

    
    for(const bullet of ship.Bullets)
    {
        Render.renderGameObject(contextCanvas, spritesheet, bullet)
    }


    for(const bullet of alienBullets)
    {
        Render.renderGameObject(contextCanvas, spritesheet, bullet)
    }


    
    Render.renderGameObject( contextCanvas, spritesheet, boss )
    Render.renderGameObject( contextCanvas, spritesheet, ship )


    if( explosion.Lives )
    {
        Render.renderGameObject( contextCanvas, spritesheet, explosion )
    }


    Render.text
    (
        contextCanvas,                         // CONTEXT CANVAS
        { color: '#FFF', family: '7px serif'}, // FONT
        0, Env.Global.get('screen').width - 8, // POSITION
        `SCORE : ${score}`                     // MESSAGE
    )
    
    // Frame de mudança de "level"
    if ( !aliens.length && !boss.Lives )
    {
        let Win = new GameObject('Window')
            Win.Position = new Vector2D(0, 0)
            Win.Width  = 300
            Win.Height = 300
        
        const font1 = { color: '#FFF', family: '27px serif'} 
        const font2 = { color: '#FFF', family: '47px serif'} 

        Render.fillRect(contextCanvas, Win, '#000')

        Render.text(contextCanvas, font1,
            Win.Width / 3, Win.Height / 2, 
            `Next Stage`
        )

        Render.text(contextCanvas, font2,
            0, Win.Height / 4, 
            `Stage ${stage}`
        )
    }

    // Frame de "pause"
    if ( pause )
    {
        let Win = new GameObject('Window')
            Win.Position = new Vector2D(0, 0)
            Win.Width  = 300
            Win.Height = 300
        
        const font = { color: '#FFF', family: '27px serif'} 
  
        Render.fillRect(contextCanvas, Win, '#000')

        Render.text(contextCanvas, font,
            Win.Width / 3, Win.Height / 2, 
            `Pause`
        )

    }
}


function logic()
{
    // Reiniciar e novo 'fase'
    if( !aliens.length  && !boss.Lives  && !controlTime)
    {
        const milliseconds = 2000

        setTimeout(() => {
           
            aliens = generateAliens()
            boss.Position = new Vector2D( Env.Global.get('screen').width, 10 )
            boss.Speed = new Vector2D( 8, 0 )
            boss.Sense = new Vector2D(-1, 0 )
            boss.Lives = 1

            stage++
            controlTime = !controlTime
    
        }, milliseconds )

        controlTime = !controlTime
    }


    // Delay de tiros dos aliens

    let delay = 1 - stage / 10

    Game.setInterval(() => {

        if( !aliens.length ) return

        let index = parseInt( Math.random() * aliens.length )
        
        let bullet = new Bullet( 'Bullet-Aliens' )
            bullet.Position = new Vector2D( aliens[index].X, aliens[index].Y )
            bullet.Width  =  3
            bullet.Height =  8
            bullet.Speed  =  new Vector2D( 0, 8 )
            bullet.Sense  =  new Vector2D( 0, 1 )
            bullet.addCoordSprite( {x: 16, y: 8}, 8 )

            alienBullets.push( bullet )

    }, delay )
}


function update()
{
    
    moveAliens(aliens)


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


    for(const bullet of ship.Bullets )
    {
        
        bullet.Position = Vector2D.sum( 
            bullet.Position, 
            Vector2D.scale(bullet.Speed, bullet.Sense )
        )
        
        if(bullet.Y + bullet.Height < 0) ship.RemoveBullets()
        
        if(Collision.collisionBetweenGameObject(boss, bullet))
        {
            boss.Lives--
            score += boss.Score
            // sound.get('explosion-boss').play()

            if( !boss.Lives )
            {
                explosion.Lives = 1
                explosion.Position = new Vector2D( boss.X, boss.Y )
                boss.Speed = new Vector2D(0, 0)
                boss.Position = new Vector2D( Env.Global.get('screen').width )
                // sound.get('end-win').play()
            }

            Game.removeGameObjectArrayById( ship.Bullets, bullet.Id )
        }


        for(const block of defense)
        {
            if( Collision.collisionBetweenGameObject(bullet, block) )
            {   
                block.Resistance--
                block.CurrentSprite--

                if( !block.Resistance )
                {
                    Game.removeGameObjectArrayById(defense, block.Id)
                }
                
                Game.removeGameObjectArrayById(ship.Bullets, bullet.Id)
            }   
        }
    
        for(const alien of aliens)
        {
            if( Collision.collisionBetweenGameObject(bullet, alien) )
            {
                score += alien.Score
                // sound.get('explosion-alien').play()
                sound.explosion.play('explosion-alien')

                explosion.Lives = 1
                explosion.Position = new Vector2D( alien.X, alien.Y )

                Game.removeGameObjectArrayById(ship.Bullets, bullet.Id)
                Game.removeGameObjectArrayById(aliens, alien.Id )
                
                break
            }
        }    
    }
    

    for(const bullet of alienBullets)
    {

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
        if(Collision.collisionBetweenGameObject(bullet, ship))
        {
            Game.removeGameObjectArrayById(alienBullets, bullet.Id)
    
        }

        // Check collision with alien bullets and defense
        for(const block of defense)
        {
            if(Collision.collisionBetweenGameObject(bullet, block))
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


    for(const alien of aliens )
    {
        for(const block of defense )
        {
            if( Collision.collisionBetweenGameObject( alien, block ) )
            {
            
                block.Resistance--
                block.CurrentSprite--

                if( !block.Resistance )
                {
                    Game.removeGameObjectArrayById(defense, block.Id)
                }
            }
        }

        const SECONDS = 1
        Animation.run( alien, SECONDS ) 
    }


    if(explosion.Lives )
    {
        Animation.run(explosion, 0.1, () => {
            explosion.Lives = 0
        } )
    }
    
}


function joystick()
{
    
    if( Control.isDown( 'a', 'arrowleft' ) && ship.X >= 8) 
        ship.Sense = new Vector2D(-1, 0)
    else if(Control.isDown( 'd', 'arrowright' ) && ship.X <= Env.Global.get('screen').width - 12) 
        ship.Sense = new Vector2D( 1, 0 )
    else 
        ship.Sense = Vector2D.scale( ship.Sense, 0 )
    
    
    if( Control.isDown( 'w', 'spacebar', 'arrowup' ) )
    {   
        const SPACE_BETWEEN_BULLETS = 50
        

        if( ship.Bullets[ship.Bullets.length - 1]?.Y  + SPACE_BETWEEN_BULLETS > ship.Y )
            return

        

        let bullet = new Bullet( 'Bullet-Spaceship' )
            bullet.Position = new Vector2D( ship.X + 2, ship.Y )
            bullet.Width  = 4
            bullet.Height = 8
            bullet.Speed = new Vector2D( 0,  8 )
            bullet.Sense = new Vector2D( 0, -1 )
            bullet.addCoordSprite( { x: 10, y: 8 }, 4, 8 )

        ship.AddBullets( bullet )
        sound.laser.play( 'laser' )

    }

    
    if( Control.isDown('enter', 'p') )
    {
        pause = !pause
    }

}


export default init
