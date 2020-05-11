'use strict'

import Screen from './modules/screen/Screen.js'
import StartUp from './game/Game.js'
import Render from './modules/render/Render.js'

(async function(){
    const screen = new Screen()
        screen.PixelDensityOfHeight = 90
    
    
    StartUp()

})()