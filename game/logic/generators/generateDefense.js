import Wall from '../../character/Wall.js'
import Numeric from '../../../modules/utils/numeric/Numeric.js'

/**
 * Creates and configures defense blocks
 */
export default function generateDefense()
{
    /**
     * 
     * @param {number} positionX 
     * @param {number} positionY 
     */
    let defense = []

    function createDefenseSection(positionX, positionY)
    {

        if(!Numeric.isNumber(positionX) || !Numeric.isNumber(positionY))
        {
            throw new TypeError('"generateDefense -> createDefenseSection", "positionX" and "positionY" must be number')
        }


        let section = []

        const QUANTITY_OF_LINES   = 3
        const QUANTITY_OF_COLUMNS = 4

        
        let i = 0
        while (++i <= QUANTITY_OF_LINES)
        {
    
            let row = []
            let j = 0
            while(++j <= QUANTITY_OF_COLUMNS)
            {
                const block = new Wall('Wall')
                    block.Width      = 8
                    block.Height     = 8
                    block.Resistance = 3
                    block.X = (j * block.Width) + positionX
                    block.Y = (i * block.Height) + positionY
                    block.AddCoordSprite({x: 0, y: 0})
    
                row.push(block)
            }
    
            section.push(row)
        }
    
        return section
    }

    const sectionOne    = createDefenseSection(0x19, 0xAA) // 25 , 170
    const sectionTwo    = createDefenseSection(0x69, 0xAA) // 105, 170
    const sectionThree  = createDefenseSection(0xB4, 0xAA) // 180, 170

    defense.push(sectionOne, sectionTwo, sectionThree)

    return defense
}