const { StatusCodes } = require('http-status-codes');
const { FavRepository, StockRepository } = require('../repositories');
const favRepository = new FavRepository();
const stockRepository = new StockRepository();
const AppError = require('../utils/errors/app-error');

async function addToFav(data) {
    try {
        const stockId = await stockRepository.findStock(data.stockId);
        if(!stockId) {
            throw 'no such stock exists';
        }
        const fav = await favRepository.addToFav(stockId);
        return fav;
    } catch (error) {
        throw new AppError(error, StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllFav() {
    try {
        const favStocks = await favRepository.getFav();
        return favStocks;
    } catch (error) {
        throw new AppError(error, StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    addToFav,
    getAllFav,
}
