# product-nodejs-app and inventory-nodejs-app

<b> Product & inventory microservice app built using node JS & rabbit mq - Docker. </b>

```
docker build -t ramya/node-web-app .
docker build -t sathish/node-web-app .
docker run -d --hostname my-rabbit --name some-rabbit rabbitmq:3   
docker run -p 3000:8081 --name inventory-app --link some-rabbit:rabbit -d ramya/node-web-app
docker run -p 3001:8080 --name product-app --link some-rabbit:rabbit -d sathish/node-web-app 
```

or 

<b> Docker compose - start multi contanier</b>

```
docker build -t ramya/node-web-app .
docker build -t sathish/node-web-app .
docker-compose up
```

open post man client 

Perform POST operation : http://localhost:3001/product/save 

```
Request body:
 {
    "productId": "10",
    "productName": "Fsports",
    "size": "3",
    "price": 5000000,
    "discount": 0,
    "color": "White",
    "category": "Shoes for men"
}
```

<b>You will Notice that product id will be sent to subscribers(inventory app will recive it) - Exchange type is FANOUT.</b>


# product node-js and Order-nodejs-app

```
start the rabbit mq
start the product app - node app.js
start the order app - node www(inside bin)
```

Perform POST operation : http://localhost:3000/product/save 

```
Request body:
 {
    "productId": "10",
    "productName": "Fsports",
    "size": "3",
    "price": 5000000,
    "discount": 0,
    "color": "White",
    "category": "Shoes for men"
}
 ```

<b>You will Notice that message will be sent to worker ques (order app will recive it) - Exchange type is DEFAULT(no excahange is specified ).</b>

prefect size as 10.







