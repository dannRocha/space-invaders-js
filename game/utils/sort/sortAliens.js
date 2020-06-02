export default function sortAliens(alienA, alienB)
{
    if(alienA.Id > alienB.Id) return  1
    if(alienA.Id < alienB.Id) return -1
    
    return 0
}