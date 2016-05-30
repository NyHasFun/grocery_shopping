//the node packages that we need
require('dotenv').config();
var Peapod = require('peapod');

var config = {
    username: process.env.username,
    password: process.env.password,
}
 
var peapod = new Peapod(config);

var cart = {};
var i=0;
var productId = 0;

peapod.viewCart(function (err, results) {
	cart = results.items;
	removeItem();
});

function removeItem(){
	if(i < cart.length){
		productId = cart[i].prodId;
		peapod.removeFromCart(productId, function (err, didSucceed) {
			nextItem();
		});
	}
	else{
		if(cart.length == 0){
			console.log("Cart is empty")
		}else{
			console.log("Opps, there's stuff in the cart")
		}
	};
}
function nextItem(){
		i++;
		removeItem();
}

