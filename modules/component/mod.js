import _button from './button/Button.js'
import _frame from './frame/Frame.js'

export default class Component
{
    constructor()
    {
        throw new Error('class "Component" must not be instantiated')
    }

    static frame()
    {
        // return frame
    }

    static button()
    {
        // return button
    }
}