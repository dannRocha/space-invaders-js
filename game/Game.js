import Emeny from './character/emeny/Emeny.js'
import Ship from './character/hero/Ship.js'

import Env from '../modules/utils/environment/Env.js'
import Figure from '../modules/figure/Figure.js'
import Game from '../modules/game/Game.js'
import Render from '../modules/render/Render.js'


const ship = new Ship('Ship')
const boss = new Emeny('Boss')
const aliens = new Array()


function generateAliens()
{
    let pointer = 10
    const COLLUMNS = 18
    const ROWS = 6
    const MARGIN = 1.5
    const WIDTH = 8, HEIGHT = 8

    for(let rows = 0, coordx = 0, coord_y = 0, coord_xx = 8; rows < 6; ++rows, coordx += WIDTH, coord_y += HEIGHT, coord_xx += 16)
    {
        const emeny = []
        
        for(let collumns = 0, coord_x = 0; collumns < COLLUMNS; ++collumns, coord_x += 8)
        {
            const alien = new Emeny('Alien')
                alien.X = coord_x * MARGIN
                alien.Y = coord_y * MARGIN + 30
                alien.Width = 8
                alien.Height = 8
                alien.Pointer = pointer
                alien.Speed = 0.5
                alien.AddCoordSprite({x: coordx * 2, y: 0 })
                alien.AddCoordSprite({x: coord_x, y: 0 })
       
            emeny.push(alien)
        }

        pointer += 5
        aliens.push([...emeny])
    }
}

async function setting()
{
    Env.Global.set('spritesheet', await Figure.LoadImage('../assets/img/invade.png'))
    Env.Global.set('score', 0)

        // SETTING HERO:SHIP
        ship.X = parseInt(Env.Global.get('screen').width / 2)
        ship.Y = parseInt(Env.Global.get('screen').height - 32)
        ship.Width  = 8
        ship.Height = 8
        ship.Pointer = -1_000
        ship.AddCoordSprite({x: 0, y: 8})

        // SETTING EMENY:BOSS
        boss.X = 0
        boss.Y = 10
        boss.Width = 8
        boss.Height= 8
        boss.Speed = 0.5
        boss.Pointer = 1_000
        boss.AddCoordSprite({x: 24, y: 8})

        // SETTING EMENY:ALIENS
        generateAliens()
        
}

async function startUp()
{
    await setting()

    Game.Loop(() => {
        draw()
    })
}

function draw()
{
    const contextCanvas = Env.Global.get('context')
    const spritesheet = Env.Global.get('spritesheet')

    Render.BackgroundColor(contextCanvas, '#000')

    Render.RenderGameObject(contextCanvas, spritesheet, boss)
    Render.RenderGameObject(contextCanvas, spritesheet, ship)

    for(let lineOfAliens of aliens)
    {
        for(let alien of lineOfAliens)
        {
            Render.RenderGameObject(contextCanvas, spritesheet, alien)
        }
    }

    Render.Text
    (
        contextCanvas, 
        { color: '#FFF', family: '7px serif'},
        0, Env.Global.get('screen').width - 8,
        `SCORE : ${Env.Global.get('score')}`
    )
}

export default startUp
