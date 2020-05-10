import Game from '../../modules/game/Game.js'
import Tank from '../character/hero/Tank.js'

const tank =  new Tank()
const screen = Game.Global.get(screen)


    tank.X = screen.width  / 2
    tank.Y = screen.height / 2
    tank.Width  = 8
    tank.Height = 8

export default tank