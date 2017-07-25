class Order
{

    constructor(orderID,clientId,productName,locationName,quantity) {
        this.orderID = orderID;
        this.clientId = clientId;
        this.productName = productName;
        this.locationName =locationName;
        this.quantity =quantity;
    }
    getOrderID(){
        return this.orderID;
    }

    getProductName(){
        return this.productName;
    }

    setOrderId(orderID){
        this.orderID=orderID;
    }
    toString(){
        return JSON.stringify(this);
    }
}
module.exports=Order;