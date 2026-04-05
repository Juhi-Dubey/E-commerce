
let cache = {};

const getCache = () => cache;

const clearCache = () => {
    cache = {};
};

module.exports = { getCache, clearCache };