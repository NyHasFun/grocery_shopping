I thought it would be cool to create something that delivers the ingredients for my favorite recipe to my apartment. Basically BlueApron but for a recipe of my choosing. I found [Mathias Hansen's](http://codemonkey.io/) [unofficial peapod API](https://github.com/MiniCodeMonkey/node-peapod) and decided to give it a try.

I'd never worked with node previously so I learned about npm and using it to install packages both locally and globally.

Running SpicySauagePasta.js will add all the ingredients needed for [Kevin & Amanda's Spicy Sausage Pasta](http://www.kevinandamanda.com/spicy-sausage-pasta/) to my [Peapod](peapod.com) cart. 

My biggest issue with this project was finding the right method to add each element in the array of ingredients to the peapod cart.

__Method 1:__ a simple for loop
__Issue:__ The for loop ran faster than the "peapod API" was able to process. Any items the loop processed while waiting on the API to response were not added to the card.

__Method 2:__ the setTimeout method --  I used this to create a recursive loop that would add an item every 2 seconds. This worked but having a set time creates it own problems.
__Issue:__   If the api took more than 2 seconds then the item would be skipped or if the api took more than 2 seconds then the program is slow for no reason.

__Method 3:__ Callbacks! 
Instead of a for loop or a timed loop to cycle through the array of ingredients, I created two functions. One function adds items to the cart and the other increases the index on the ingredients array. Each function calls the other once it has finished running. When all the elements in the ingredient array after been added to the cart it stops. It took me a few tries to nail down the logic, but now it works great. :tada:
