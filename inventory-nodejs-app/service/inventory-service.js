
var Inventory=require("../model/Inventory");
var HashMap = require('hashmap');
var rabbitmqconn=require('../messaging/rabbitmqconnection');
var inventoryrepository={
		
		inventoryMap: null,
		
		initializeMap: function(){
			console.log("Initializing the hash map");
			this.inventoryMap=new HashMap();
		},

				
		saveInventory:function(inventory){
			console.log("save inventory is called"+inventory);
			this.inventoryMap.set(inventory.productName,JSON.stringify(inventory));
			
		},
		
		getInventory:function(productName){
			console.log("get inventory is called"+productName);
			return this.inventoryMap.get(productName);
		}
};
inventoryrepository.initializeMap();

var inventoryservice={
		
		inventoryRepo: null,
		
		setInventoryRepo: function(repo){
			this.inventoryRepo=repo;
		},
		
		getInventoryRepo:function(){
			return this.inventoryRepo;
		},

		saveInventory:function(inventory){
			console.log("save inventory service is called"+inventory);
			this.getInventoryRepo().saveInventory(inventory);
		},
		
		getInventory:function(productName){
			console.log("get inventory service is called"+productName);
			return this.getInventoryRepo().getInventory(productName);
		}
		
		
};

inventoryservice.setInventoryRepo(inventoryrepository);

module.exports=inventoryservice;
