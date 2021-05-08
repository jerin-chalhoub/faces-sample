import APIClient from '../Network/APIClient';

function getContentAsset(assetId, completion) {
    getContentAssets([assetId], completion);
}

function getContentAssets(assetIds, completion) {
    let apiClient = new APIClient('content/('+ assetIds.join(',') +')');
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

function getHomeContent(completion) {
    getContentAsset('Mobile-Home-Components', function(data, error) {
        if (data !== undefined && data.length > 0) {
            getContentAssets(data[0].c_mResponseIds, completion);
        } else {
            completion(null, "No data found");
        }
    });
}

module.exports = {
    getContentAsset,
    getContentAssets,
    getHomeContent
};