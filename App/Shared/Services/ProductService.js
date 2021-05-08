import APIClient from '../Network/APIClient';
import Product from '../Models/Product';

function getProducts(offset, count, categoryId, completion) {
  let apiClient = new APIClient('product_search?count='+count+'&start='+offset+'&refine_1=cgid='+categoryId);
  apiClient.setMethod('GET');
  apiClient.call(function(data, error) {
    if (error !== null) {
      completion(null, error);
    } else if (data.hits !== undefined) {
      const products = []
      data.hits.map((hit) => {
        const product = new Product(hit);
        products.push(product);
      });
      completion(products, null);
    } else {
      completion(null, "No data found");
    }
  });
}

function getProductsByIDs(productsIds, completion) {
  let apiClient = new APIClient('products/('+ productsIds.join(',') +')');
  apiClient.setMethod('GET');
  apiClient.call(function(data, error) {
    if (error !== null) {
      completion(null, error);
    } else if (data.data !== undefined) {
      const products = []
      data.data.map((hit) => {
        const product = new Product(hit);
        products.push(product);
      });
      completion(products, null);
    } else {
      completion(null, "No data found");
    }
  });
}

function getProduct(productId, completion) {
  let apiClient = new APIClient('products/'+ productId + '?expand=availability,prices,images,options,variations,promotions');
  apiClient.setMethod('GET');
  apiClient.call(function(data, error) {
    if (error !== null) {
      completion(null, error);
    } else if (data !== undefined) {
      completion(data, null);
    } else {
      completion(null, "No data found");
    }
  });
}

module.exports = {
  getProducts,
  getProductsByIDs,
  getProduct
};