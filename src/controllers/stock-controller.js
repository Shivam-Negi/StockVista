const { StatusCodes } = require('http-status-codes');
const { StockService } = require('../services');
const { successResponse, errorResponse } = require('../utils/common');

async function getTopTen(req, res) {
    try {
        const stocks = await StockService.getTopTen();
        successResponse.data = stocks;
        return res.status(StatusCodes.OK)
                    .json(successResponse);
    } catch (error) {
        errorResponse.error = error;
        return res.status(error.statusCode)
                    .json(errorResponse);
    }
}

async function getByName(req, res) {
    try {
        const stock = await StockService.getByName(req.params.name);
        successResponse.data = stock;
        return res.status(StatusCodes.OK)
                    .json(successResponse);
    } catch (error) {
        errorResponse.error = error;
        return res.status(error.statusCode)
                    .json(errorResponse);
    }
}

async function getHistory(req, res) {
    try {
        const stock = await StockService.getHistory(req.params.id);
        successResponse.data = stock;
        return res.status(StatusCodes.OK)
                    .json(successResponse);
    } catch (error) {
        errorResponse.error = error;
        return res.status(error.statusCode)
                    .json(errorResponse);
    }
}



module.exports = {
    getTopTen,
    getByName,
    getHistory
}