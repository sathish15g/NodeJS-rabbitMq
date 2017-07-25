/**
 * Created by s.kumar.ganesan on 7/10/2017.
 */

var Order = require("../model/Order");
var HashMap = require('hashmap');
var rabbitmqconn = require('../mess/MessageListner');
var orderRepository={

    orderMap: null,

    initializeMap: function(){
        console.log("Initializing the hash map");
        this.orderMap=new HashMap();
        console.log("after Initializing");
    },


    saveOrder:function(order){
        console.log("save order is called"+order);
        this.orderMap.set(order.orderID,JSON.stringify(order));
        console.log("SAVE ORDER DETAILS",this.orderMap.get(order.orderID));
    },

    getOrder:function(orderId){
        console.log("get order is called"+orderId);
        console.log("get ORDER DETAILS"+this.orderMap.get(orderId));
        return this.orderMap.get(orderId);
    }
};
orderRepository.initializeMap();

var orderService={

    orderRepo: null,

    setOrderRepo: function(repo){
        this.orderRepo=repo;
    },

    getOrderRepo:function(){
        return this.orderRepo;
    },

    saveOrder:function(order){
        console.log("save order service is called"+order);
        this.getOrderRepo().saveOrder(order);
    },

    getOrder:function(orderID){
        console.log("get order service is called"+orderID);
        return this.getOrderRepo().getOrder(orderID);
    }


};

orderService.setOrderRepo(orderRepository);

module.exports=orderService;
