//the node packages that we need
//
require('dotenv').config();
var Peapod = require('peapod');

//I've never used an evironment variable before, pretty handy!
var config = {
    username: process.env.username,
    password: process.env.password,
}
 
var peapod = new Peapod(config);

var sspasta =[
	{productId: 136930, quantity: 1},
	{productId: 118602, quantity: 1},
	{productId: 49987, quantity: 1},
	{productId: 121663, quantity: 1},
	{productId: 185729, quantity: 1},
	{productId: 119961, quantity: 1},
	{productId: 128087, quantity: 1},
	{productId: 30072, quantity: 1},
	{productId: 23555, quantity: 1}
]

/* 
//for loop cycles too quickly for the api
for(var i=0; i<2; i++){
	var productId = sspasta[i].productId;
	var quantity = sspasta[i].quantity;
	console.log(productId+" "+quantity)
	peapod.addToCart(productId, quantity, function (err, didSucceed){
	console.log(productId+" "+quantity+" "+didSucceed);
	});
}
*/

/*
//used the setTimeout to slow it down
//http://stackoverflow.com/questions/3583724/

var i = 0;                     //  set your counter to 1

function myLoop () {           //  create a loop function
  setTimeout(function () {    //  call a 2s setTimeout when the loop is called
		var productId = sspasta[i].productId
		var quantity = sspasta[i].quantity
		peapod.addToCart(productId, quantity, function (err, didSucceed){
			console.log(productId+" "+quantity+" "+didSucceed);
		});          //  your code here
      i++;                     //  increment the counter
     if (i < sspasta.length) {            //  if the counter < sspasta, call the loop function
         myLoop();             //  ..  again which will trigger another 
      }
      else{
      	printCart();
      }                        //  ..  setTimeout()
   }, 2000)
}

myLoop();
*/

//I didn't like setTimeout becuase if the api took 
//		more than 2s then the item would be skipped
//		less than 2s then the program is slow for no reason
//Then I found callbacks! Took some time to nail down the logic
//		but now its great!!


var i=0;
var productId;
var quantity;

function cartItem(){
	if(i < sspasta.length){
		productId = sspasta[i].productId;
		quantity = sspasta[i].quantity;
		peapod.addToCart(productId, quantity, function (err, didSucceed){
			nextItem();
			console.log(productId+" "+quantity+" "+didSucceed)
		});
	}
	else{
		printCart();
	};
}
function nextItem(){
		i++;
		cartItem();
}

cartItem();


// //Display the cart when you are done
var total = 0;
var cart = {};

function printCart(){
	var total = 0;
	var cart = {};
	peapod.viewCart(function (err, results) {
	    cart = results.items;
				for(var i=0; i<cart.length; i++)
					{console.log(cart[i].name
						+'\t$'+cart[i].price
						+'\t'+cart[i].prodId
						+'\t'+cart[i].size);
					total += cart[i].price;
					}
				console.log("Total: $"+total)
	});
}

/*
Next Steps
	-Create a file to empty the cart
		right now i just go the peapod website :)
*/





