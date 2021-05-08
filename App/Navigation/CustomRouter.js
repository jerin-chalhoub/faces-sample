function route(navigation, path) {
    if(path === undefined) { return }
    const pathComponents =  path.split(">")
    if(pathComponents.length < 2) { return }
    switch(pathComponents[0]) {
        case "product":
            navigation.navigate('Details', { productId: pathComponents[1] } )
            break;
        case "category":
            navigation.navigate('ProductListing', { categoryId: pathComponents[1] } )
            break;
        default:
          console.log('No Route available');
      } 
}
module.exports = {
    route
};