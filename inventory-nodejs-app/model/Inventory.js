class Inventory{
	
	constructor(productName,locationName,quantity){
		this.productName=productName;
		this.locationName=locationName;
		this.quantity=quantity;
	}
	
	getProductName(){
		return this.productName;
	}
	
	setProductName(productName){
		this.productName=productName;
	}
	
	toString(){
		return JSON.stringify(this);
	}
}

module.exports=Inventory;