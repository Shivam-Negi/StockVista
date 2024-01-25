const CrudRepository = require('./crud-repository');
const Fav = require('../models/fav');

class FavRepository extends CrudRepository {
    constructor() {
        super(Fav);
    }

    async addToFav(stockId) {
        const fav = await Fav.create({
            stockId : stockId
        });
        return fav;
    }

    async getFav() {
        const favStocks = await Fav.find().populate({
                                        path : 'stockId',
                                    });
console.log('fav : ', favStocks);
        return favStocks;
    }
}

module.exports = FavRepository;