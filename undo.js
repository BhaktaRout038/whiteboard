const canvas = document.getElementsByTagName('canvas')[0]; // Select canvas using getElementsByTagName
        const context = canvas.getContext('2d');
        const history = [];
        let currentState = null;

        function saveState() {
            history.push(canvas.toDataURL());
            currentState = history.length ;
        }

        function undo() {
            
            if (currentState > 0) {
                currentState--;
                const img = new Image();
                img.onload = function () {
                    context.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
                    for (let i = 0; i <= currentState; i++) {
                        const historyImg = new Image();
                        historyImg.src = history[i];
                        context.drawImage(historyImg, 0, 0);
                    }
                    
                };
                
                img.src = history[currentState];
                
            }
        }

        // Call saveState before any drawing operation
        canvas.addEventListener('mousedown', saveState);
        

        // Undo on click
        const undoButton = document.getElementById('undo');
        undoButton.addEventListener('click', undo);


/*__________________________________________________________________________________For Mobile Touch___________________________________________________________________________ */

canvas.addEventListener('touchstart', saveState); // For touch devices
        // To handle touch events for undo on mobile devices
undoButton.addEventListener('touchstart', function (event) {
    event.preventDefault(); // Prevent default touch behavior (like scrolling)
    undo();
});