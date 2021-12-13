import coupons from "../resources/coupons"
import productItems from "../resources/productItems"


const DataManager = (function() {

    const getProductItemList = () => productItems;

    const getCoupons = () => coupons;

    return {
        getProductItemList,
        getCoupons
    }
}())
export default DataManager