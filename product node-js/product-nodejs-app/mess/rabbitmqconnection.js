var amqp = require('amqplib/callback_api');

var amqpConn = null;

var start = {

    "connectMQ":function (productID) {
        amqp.connect('amqp://localhost', function(err, conn) {
        if (err) {
            console.error("[AMQP]", err.message);
            return setTimeout(start.connectMQ, 1000);
        }
        conn.on("error", function(err) {
            if (err.message !== "Connection closing") {
                console.error("[AMQP] conn error", err.message);
            }
        });
        conn.on("close", function() {
            console.error("[AMQP] reconnecting");
            return setTimeout(start.connectMQ, 1000);
        });
        console.log("[AMQP] connected");
        amqpConn = conn;
        whenConnected();
    });
}
}



function whenConnected() {
    startPublisher();
}

var pubChannel = null;
var offlinePubQueue = [];
function startPublisher() {
    amqpConn.createConfirmChannel(function(err, ch) {
        if (closeOnErr(err)) return;
        ch.on("error", function(err) {
            console.error("[AMQP] channel error", err.message);
        });
        ch.on("close", function() {
            console.log("[AMQP] channel closed");
        });

        pubChannel = ch;
        while (true) {
                var m = offlinePubQueue.shift();
            //console.log("offlinePubQueue");
            if (!m) break;
            publish(m[0], m[1], m[2]);
        }
    });
}

function publish(exchange, routingKey, content) {
    try {
        pubChannel.publish(exchange, routingKey, content, { persistent: true },
            function(err, ok) {
                if (err) {
                    console.error("[AMQP] publish", err);
                    offlinePubQueue.push([exchange, routingKey, content]);
                    pubChannel.connection.close();
                }
            });
    } catch (e) {
        console.error("[AMQP] publish", e.message);
        offlinePubQueue.push([exchange, routingKey, content]);
    }
}

function closeOnErr(err) {
    if (!err) return false;
    console.error("[AMQP] error", err);
    amqpConn.close();
    return true;
}

setInterval(function() {
    publish("", "jobs", new Buffer("work work work"));
}, 1000);

module.exports = start;