const { StatusCodes } = require('http-status-codes');
const { StockRepository } = require('../repositories');
const stockRepository = new StockRepository();
const AppError = require('../utils/errors/app-error');

async function getTopTen() {
    try {
        const stocks = await stockRepository.getTopTen();
        return stocks;
    } catch (error) {
        // console.log(error);
        throw new AppError('something went wrong while fetching top ten stocks', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getByName(name) {
    try {
        const stock = await stockRepository.getByName(name);
        if(!stock) {
            throw new AppError('no stock found for the given input', StatusCodes.BAD_REQUEST);
        }
        return stock;
    } catch (error) {
        // console.log(error);
        if(error instanceof AppError)   throw error;
        throw new AppError('something went wrong while fetching top ten stocks', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getHistory(id) {
    try {
        const stock = await stockRepository.getHistory(id);
        if(!stock) {
            throw new AppError('no stock found for the given input', StatusCodes.BAD_REQUEST);
        }
        return stock;
    } catch (error) {
        // console.log(error);
        if(error instanceof AppError)   throw error;
        throw new AppError('something went wrong while fetching top ten stocks', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    getTopTen,
    getByName,
    getHistory
}
