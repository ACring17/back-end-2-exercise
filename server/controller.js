let houses = require('./db.json')
let globalId = 4


const getHouses = (req, res) => {
    res.status(200).send(houses)
}

const deleteHouse = (req, res) => {
    let index = houses.findIndex(elem => elem.id === +req.params.id)
    houses.splice(i, 1)
    return res.status(200).send(houses)
}

const createHouse = (req, res) => {
    let { address, price, imageURL } = req.body

    let newHouse = {
        id: globalId,
        address,
        price,
        imageURL,
    }

    houses.push(newHouse)
    res.status(200).send(houses)
    globalId++
}
const updateHouse = (req, res) => {
    let { id } = req.params
    let { type } = req.body
    let index = houses.findIndex(elem => +elem.id === +id)

    if (houses[index].price <= 10000 && type === 'minus') {
        houses[index].price = 0
        res.status(200).send(houses)
    } else if (type === 'plus') {
        houses[index].price += 10000
        res.status(200).send(houses)
    } else if (type === 'minus') {
        houses[index].price -= 10000
        res.status(200).send(houses)
    } else {
        res.sendStatus(400)
    }
}

const exportObj = {
    getHouses,
    deleteHouse,
    createHouse,
    updateHouse
}

module.exports = exportObj