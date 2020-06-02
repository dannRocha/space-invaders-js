import button from './button/Button.js'
import frame from './frame/Frame.js'

export default class Component
{
    constructor()
    {
        throw new Error('class "Component" must not be instantiated')
    }

    static Frame()
    {
        // return frame
    }

    static Button()
    {
        // return button
    }
}