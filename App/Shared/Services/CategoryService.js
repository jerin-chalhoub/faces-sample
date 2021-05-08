import APIClient from '../Network/APIClient';

function getCategory(categoryId, completion) {
    getCategories([categoryId], completion);
}

function getCategories(categoryIds, completion) {
    let apiClient = new APIClient('categories/('+ categoryIds.join(',') +')?levels=2');
    apiClient.setMethod('GET');
    apiClient.call(function(data, error) {
        if (error !== null) {
            completion(null, error);
        } else if (data.data !== undefined) {
            completion(data.data, null);
        } else {
            completion(null, "No data found");
        }
    });
}

module.exports = {
    getCategory,
    getCategories
};