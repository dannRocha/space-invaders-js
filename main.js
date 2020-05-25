'use strict'

import Screen from './modules/screen/Screen.js'
import startUp from './game/Game.js'

(async function()
{
    const screen = new Screen(940, 580)
        screen.PixelDensityOfHeight = 270
        screen.PixelDensityOfWidth = 270
    

    startUp()

})()