const { errorCodes, successCodes } = require("../utils/statusCodes");
const handleError = require("../utils/CRUDErrorHandler");
const fetchBirthdays = require("../services/fetcher/birthdayFetcher");
const fetchQuote = require("../services/fetcher/randomQuoteFetcher");
const fetchWaifu = require("../services/fetcher/waifuImageFetcher");
const fetchRandomAnimes = require("../services/fetcher/randomAnimeFetcher");

const getBirthdays = async (req, res, next) => {
    try {
        const birthdays = await fetchBirthdays();
        res.status(successCodes.OK).json({
            status: "success",
            data: {
                birthdays,
            }
        })
    } catch(err) {
        res.status(errorCodes.SERVER_ERROR);
        next(err);
    }
}

const getQuote = async (req, res, next) => {
    try {
        const quote = await fetchQuote();
        res.status(successCodes.OK).json({
            status: "success",
            data: {
                quote,
            }
        });
    } catch(err) {
        res.status(errorCodes.SERVER_ERROR);
        next(err);
    }
}

const getWaifu = async (req, res, next) => {
    try {
        const waifu = await fetchWaifu("sfw");
        res.status(successCodes.OK).json({
            status: "success",
            data: {
                waifu,
            }
        });
    } catch(err) {
        res.status(errorCodes.SERVER_ERROR);
        next(err);
    }
}

const getAnimes = async (req, res, next) => {
    try {
        const animes = await fetchRandomAnimes(5);
        res.status(successCodes.OK).json({
            status: "success",
            data: {
                animes,
            }
        });
    } catch(err) {
        res.status(errorCodes.SERVER_ERROR);
        next(err);
    }
}

module.exports = {
    getBirthdays,
    getQuote,
    getWaifu,
    getAnimes,
};