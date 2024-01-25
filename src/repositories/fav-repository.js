const CrudRepository = require('./crud-repository');
const Fav = require('../models/fav');

class FavRepository extends CrudRepository {
    constructor() {
        super(Fav);
    }
}

module.exports = FavRepository;