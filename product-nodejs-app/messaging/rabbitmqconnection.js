var amqp = require('amqplib/callback_api');

var start = {
    startMessaging: function (productID) {
        amqp.connect('amqp://rabbitmq', function (err, conn) {
            conn.createChannel(function (err, ch) {
                var q = 'product';
                var msg = productID;

               // ch.assertQueue(q, {durable: false});
				ch.assertExchange(q, 'fanout', {durable: false});
				ch.publish(q, '', new Buffer(msg));
                // Note: on Node 6 Buffer.from(msg) should be used
                ch.sendToQueue(q, new Buffer(msg));
                console.log(" [x] Sent PRODUCT ID - %s", msg);
            });
            setTimeout(function () {
                conn.close();
            }, 500);
        });
    }
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
      if (!m) break;
      publish(m[0], m[1], m[2]);
    }
  });
}

module.exports = start;
