'use strict'

import Screen from './modules/screen/Screen.js'
import StartUp from './game/Game.js'

(async function()
{
    const screen = new Screen(940, 580)
        screen.PixelDensityOfHeight = 250
        screen.PixelDensityOfWidth = 250
    

    StartUp()

})()