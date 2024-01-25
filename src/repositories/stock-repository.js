const CrudRepository = require('./crud-repository');
const Stock = require('../models/stock');

class StockRepository extends CrudRepository {
    constructor() {
        super(Stock);
    }

    async getTopTen() {
        const stocks = await Stock.find()
                            .sort({ 
                                turnover : -1 
                            }).limit(10);
        return stocks;
    }

    async getByName(name) {
        const regex = new RegExp(`^${name}$`, 'i');
        console.log(`stock name bfor ${name} and after regex ${regex}`);
        // Find the stock by name, case-insensitive
        const stock = await Stock.findOne({ name: regex });
        return stock;
    }

    async getHistory(id) {
        const stock = await Stock.findOne({
            _id : id
        });
        return stock;
    }
}

module.exports = StockRepository;