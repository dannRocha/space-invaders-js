import Ship from './character/hero/Ship.js'
import Boss from './character/emeny/Boss.js'
import Emeny from './character/emeny/Emeny.js'

import Env from '../modules/utils/environment/Env.js'
import Render from '../modules/render/Render.js'
import Figure from '../modules/figure/Figure.js'
import Game from '../modules/game/Game.js'

const ship = new Ship('ship')
const boss = new Boss('boss')
const emenys = new Array()


async function Setting()
{


    Env.Global.set('spritesheet', await Figure.LoadImage('../assets/img/invade.png'))

        // SETTING HERO:SHIP
        ship.X = parseInt(Env.Global.get('screen').width / 2)
        ship.Y = parseInt(Env.Global.get('screen').height - 8)
        ship.Width  = 8
        ship.Height = 8
        ship.AddCoordSprite({x: 0, y: 8})

        // SETTING EMENY:BOSS
        boss.X = parseInt(Env.Global.get('screen').width)
        boss.Y = 0
        boss.Width = 8
        boss.Height= 8
        boss.Speed = 0.5        
        boss.AddCoordSprite({x: 24, y: 8})

}

async function StartUp()
{
    await Setting()

    Game.Loop(function(){
        
        Draw()
    })  
}

function Draw()
{
    const contextCanvas = Env.Global.get('context')
    const spritesheet = Env.Global.get('spritesheet')

    Render.BackgroundColor(contextCanvas, '#000')

    Render.DrawPicture(
        contextCanvas, 
        spritesheet, 
        0,0, 
        8, 8, 0, 0, 10, 100
    )
}

export default StartUp



