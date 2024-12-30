function getReceipt() {
  // This initializes our string so it can get passed from function to function
  // growing line by line into a full receipt
  var text1 = "<h3>You Ordered: </h3>";
  var runningTotal = 0;
  var sizeTotal = 0;
  var sizeArray = document.getElementsByClassName("size");

  var selectedSize = ""; // Initialize to avoid undefined error
  for (var i = 0; i < sizeArray.length; i++) {
    if (sizeArray[i].checked) {
      selectedSize = sizeArray[i].value;
      text1 = text1 + selectedSize + "<br>";
    }
  }

  if (selectedSize === "Personal Pizza") {
    sizeTotal = 6;
  } else if (selectedSize === "Small Pizza") {
    sizeTotal = 8;
  } else if (selectedSize === "Medium Pizza") {
    sizeTotal = 10;
  } else if (selectedSize === "Large Pizza") {
    sizeTotal = 14;
  } else if (selectedSize === "Extra Large Pizza") {
    sizeTotal = 16;
  }

  // Add size total to the running total
  runningTotal = sizeTotal;
  console.log("Selected Size: " + selectedSize + " = $" + sizeTotal + ".00");
  console.log("Size text1: " + text1);
  console.log("Subtotal: $" + runningTotal + ".00");

  getTopping(runningTotal, text1);
}

function getTopping(runningTotal, text1) {
  var toppingTotal = 0; // Initialize topping total
  var selectedTopping = []; // Array to store selected toppings
  var toppingArray = document.getElementsByClassName("toppings"); // Get all topping checkboxes

  for (var j = 0; j < toppingArray.length; j++) {
      if (toppingArray[j].checked) {
          // Add checked topping to the array
          selectedTopping.push(toppingArray[j].value);

          // Add topping to the receipt text
          text1 = text1 + toppingArray[j].value + "<br>";
      }
  }

  // Calculate the total cost for toppings
  var toppingCount = selectedTopping.length;
  toppingTotal = toppingCount * 1; // Each topping costs $1

  if (toppingCount > 1) {
    toppingTotal = (toppingCount - 1); // The first topping is free, each additional one costs $1
  } else {
    toppingTotal = 0; // No additional charge if there are no toppings or just one topping
  }

  // Update the running total
  runningTotal = runningTotal + toppingTotal;

  // Debugging logs for toppings
  console.log("Selected Toppings: " + selectedTopping.join(", "));
  console.log("Total selected topping items: " + toppingCount);
  console.log(toppingCount + " topping - 1 free topping = $" + toppingTotal + ".00");
  console.log("Topping text1: " + text1);
  console.log("Purchase Total: $" + runningTotal + ".00");

  // Update the receipt display in the HTML
  text1 += "<h3>Toppings Picked: " + toppingCount + "</h3>";
  document.getElementById("showText").innerHTML = text1;
  document.getElementById("totalPrice").innerHTML = "<h3>Total: <strong>$" + runningTotal + ".00</strong></h3>";
}
