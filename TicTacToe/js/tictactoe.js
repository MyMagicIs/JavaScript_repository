// This variable keeps track of whose turn it is.
let activePlayer = 'X';
// This array stores an array of moves. We use this to determine win conditions.
let selectedSquares = [];

// This function is for placing an X or O in a square.
function placeXOrO(squareNumber) {
    // This condition ensures a square hasn't been selected already.
    // The .some() method is used to check each element of the selectedSquares array
    // to see if it contains the square number clicked on.
    if (!selectedSquares.some(element => element.includes(squareNumber))) {
        // This variable retrieves the HTML element id that was clicked.
        let select = document.getElementById(squareNumber);
        // This condition checks whose turn it is.
        if (activePlayer === 'X') {
            // If activePlayer is equal to 'X', the x.png is placed in HTML.
            select.style.backgroundImage = "url('images/x.png')";
            // Active player may only be 'X' or 'O', so if not 'X' it must be 'O'.
        } else {
            // If activePlayer is equal to 'O', the o.png is placed in HTML.
            select.style.backgroundImage = "url('images/o.png')";
        }
        // squareNumber and activePlayer are concatenated together and added to the array.
        selectedSquares.push(squareNumber + activePlayer);
        // This calls a function to check for any win conditions.
        checkWinConditions();
        // This condition is for changing the active player.
        if (activePlayer === 'X') {
            // If active player is 'X', change it to 'O'.
            activePlayer = 'O';
        } else {
            // Change the active player to 'X'.
            activePlayer = 'X';
        }

        // This function plays placement sound.
        audio('./media/place.mp3');

        // This condition checks to see if it is the computer's turn.
        if (activePlayer === 'O') {
            // This function disables clicking for the computer's turn.
            disableClick();
            // This function waits 1 second before the computer places an image and enables click.
            setTimeout(function () { computersTurn(); }, 1000);
        }

        // Returning true is needed for our computersTurn() function to work.
        return true;

        // This function results in a random square being selected by the computer.
        function computersTurn() {
            // This boolean is needed for our while loop.
            let success = false;
            // This variable stores a random number 0-8.
            let pickASquare;
            // This condition allows our while loop to keep trying if a square is selected already.
            while (!success) {
                // A random number between 0 and 8 is selected.
                pickASquare = String(Math.floor(Math.random() * 9));
                // If the random number evaluated returns true, the square hasn't been selected yet.
                if (placeXOrO(pickASquare)) {
                    placeXOrO(pickASquare);
                    success = true;
                };
            }
        }    
    }
}

// This function parses the selectedSquares array to search for win conditions.
// The drawWinLine() function is called to draw a line on the screen if a condition is met.
function checkWinConditions() {
    // X 0, 1, 2 condition.
    if (arrayIncludes('0X', '1X', '2X')) { 
        drawWinLine(50, 100, 558, 100);
    }
    // X 3, 4, 5 condition.
    else if (arrayIncludes('3X', '4X', '5X')) { 
        drawWinLine(50, 304, 558, 304);
    }
    // X 6, 7, 8 condition.
    else if (arrayIncludes('6X', '7X', '8X')) { 
        drawWinLine(50, 508, 558, 508);
    }
    // X 0, 3, 6 condition.
    else if (arrayIncludes('0X', '3X', '6X')) { 
        drawWinLine(100, 50, 100, 558);
    }
    // X 1, 4, 7 condition.
    else if (arrayIncludes('1X', '4X', '7X')) { 
        drawWinLine(304, 50, 304, 558);
    }
    // X 2, 5, 8 condition.
    else if (arrayIncludes('2X', '5X', '8X')) { 
        drawWinLine(508, 50, 508, 558);
    }
    // X 6, 4, 2 condition.
    else if (arrayIncludes('6X', '4X', '2X')) { 
        drawWinLine(100, 508, 510, 90);
    }
    // X 0, 4, 8 condition.
    else if (arrayIncludes('0X', '4X', '8X')) { 
        drawWinLine(100, 100, 520, 520);
    }
    // O 0, 1, 2 condition.
    else if (arrayIncludes('00', '10', '20')) { 
        drawWinLine(50, 100, 558, 100);
    }
    // O 3, 4, 5 condition.
    else if (arrayIncludes('30', '40', '50')) { 
        drawWinLine(50, 304, 558, 304);
    }
    // O 6, 7, 8 condition.
    else if (arrayIncludes('60', '70', '80')) { 
        drawWinLine(50, 508, 558, 508);
    }
    // O 0, 3, 6 condition.
    else if (arrayIncludes('00', '30', '60')) { 
        drawWinLine(100, 50, 100, 558);
    }
    // O 1, 4, 7 condition.
    else if (arrayIncludes('10', '40', '70')) { 
        drawWinLine(304, 50, 304, 558);
    }
    // O 2, 5, 8 condition.
    else if (arrayIncludes('20', '50', '80')) { 
        drawWinLine(508, 50, 508, 558);
    }
    // O 6, 4, 2 condition.
    else if (arrayIncludes('60', '40', '20')) { 
        drawWinLine(100, 508, 510, 90);
    }
    // O 0, 4, 8 condition.
    else if (arrayIncludes('00', '40', '80')) { 
        drawWinLine(100, 100, 520, 520);
    }
    // This condition checks for a tie. If none of the above conditions are met and
    // 9 squares are selected, the code executes.
    else if (selectedSquares.length >= 9) {
        // This function plays the tie game sound.
        audio('./media/tie.mp3');
        // This function sets a 0.5 second timer before the resetGame is called.
        setTimeout(function () { resetGame(); }, 500);
    }
}

// This function checks if an array includes 3 strings.
// It is used to check for each win condition.
function arrayIncludes(squareA, squareB, squareC) {
    // These 3 variables will be used to check for 3 in a row.
    const a = selectedSquares.includes(squareA);
    const b = selectedSquares.includes(squareB);
    const c = selectedSquares.includes(squareC);
    // If the 3 variables we pass are all included in our array,
    // true is returned, and our else if condition executes the drawWinLine() function.
    if (a === true && b === true && c === true) { return true;  }

}

    // Clear the board and the array 
    function resetGame() {
        for (let i = 0; i < 9; i++) {
            let square = document.getElementById(String(i));
            square.style.backgroundImage = "";
        }
        selectedSquares = [];
        
      }
      


  // This function plays an audio sound from the provided URL
  function audio(audioURL) {
    let audio = new Audio(audioURL);
    audio.play();
  }
  



  // This function utilizes HTML canvas to draw win lines
function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
  const canvas = document.getElementById('win-lines');
  const c = canvas.getContext('2d');
  
    // Initial coordinates for the line
    let x1 = coordX1,
        y1 = coordY1,
        x2 = coordX2,
        y2 = coordY2;
        x = x1,
        y = y1;
  
    // Function to animate the line drawing
    function animateLineDrawing() {
      // Create the animation loop
      const animationLoop = requestAnimationFrame(animateLineDrawing);
  
      // Clear content from the last iteration
      c.clearRect(0, 0, 608, 608);
  
      // Start a new path
      c.beginPath();
  
      // Move to the starting point
      c.moveTo(x1, y1);
  
      // Draw the line to the current end point
      c.lineTo(x, y);
  
      // Set line width
      c.lineWidth = 10;
  
      // Set line color
      c.strokeStyle = 'rgb(0, 255, 213)';
  
      // Draw the line
      c.stroke();
  
      // Check if we've reached the end coordinates
      if (x1 <= x2 && y1 <= y2) {
        // Add 10 to x and y until we reach the end points
        if (x < x2) { x += 10; }
        if (y < y2) { y += 10; }
  
        // End animation when the coordinates match
        if (x >= x2 && y >= y2) {
          cancelAnimationFrame(animationLoop);
        }
      }
  
      // Handle reverse case (if the line is drawn in the opposite direction)
      if (x1 <= x2 && y1 >= y2) {
        if (x < x2) { x += 10; }
        if (y > y2) { y -= 10; }
  
        if (x >= x2 && y <= y2) {
          cancelAnimationFrame(animationLoop);
        }
      }
    }
  
    // Clears the canvas after the win line is drawn
    function clear() {
      const animationLoop = requestAnimationFrame(clear);
  
      // Clear the canvas
      c.clearRect(0, 0, 608, 608);
  
      // Stop the animation loop
      cancelAnimationFrame(animationLoop);
  
      // Disable clicking while the win sound plays
      disableClick();
      // Play the win sound
      audio('./media/winGame.mp3');
      // Call the main animation loop to draw the win line
      animateLineDrawing();
      // Wait for 1 second, then clear the canvas, reset the game, and allow clicking again
      setTimeout(function () {
        clear();
        resetGame();
      }, 1000);
    }

  // Start drawing the line
  animateLineDrawing();
}

  // This function makes the body element temporarily unclickable
  function disableClick() {
    const body = document.body; // Add this line to get the body element
    body.style.pointerEvents = 'none';
    setTimeout(function () {
      body.style.pointerEvents = 'auto';
    }, 1000);
  }


// This function resets the game in the event of a tie or a win.
function resetGame() {
    // This for loop iterates through each HTML square element.
    for (let i = 0; i < 9; i++) {
      // This variable gets the HTML element by its ID (square number).
      let square = document.getElementById(String(i));
      // This removes the background image from the square (clears X or O).
      square.style.backgroundImage = '';
    }
  
    // This resets the selectedSquares array so it is empty and we can start over.
    selectedSquares = [];
  }



