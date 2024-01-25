const { StatusCodes } = require('http-status-codes');
const { FavService } = require('../services');
const { successResponse, errorResponse } = require('../utils/common');

async function addToFav(req, res) {
    try {
        const fav = await FavService.addToFav(req.body);
        successResponse.data = fav;
        return res.status(StatusCodes.CREATED)
                    .json(successResponse);
    } catch (error) {
        errorResponse.error = error;
        return res.status(error.statusCode).
                    json(errorResponse);
    }
}

async function getAllFav(req, res) {
    try {
        const stocks = await FavService.getAllFav();
        successResponse.data = stocks;
        return res.status(StatusCodes.OK).
                    json(successResponse);
    } catch (error) {
        errorResponse.error = error;
        return res.status(error.statusCode).
                    json(errorResponse);
    }
}

module.exports = {
    addToFav,
    getAllFav,
}