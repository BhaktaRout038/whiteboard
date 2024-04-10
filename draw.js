    // canavas board -> left  point kitna aage  hai 
    let boardLeft = canvasBoard.getBoundingClientRect().left;
    let boardTop = canvasBoard.getBoundingClientRect().top;
    let iX, iY, fX, fY;
    let drawingMode = false;

    body.addEventListener("mousedown", function (e) {
        iX = e.clientX - boardLeft
        iY = e.clientY - boardTop
        if (cTool == "pencil" || cTool == "eraser") {
            drawingMode = true;
            tool.beginPath();
            tool.moveTo(iX, iY);
        }
    })


    body.addEventListener("mouseup", function (e) {
        if (cTool == "pencil" || cTool == "eraser") {
            drawingMode = false;
        } else if (cTool == "rect" || cTool == "line") {
            // rect, line
            fX = e.clientX - boardLeft;;
            fY = e.clientY - boardTop;
            let width = fX - iX;
            let height = fY - iY;
            if (cTool == "rect") {
                tool.strokeRect(iX, iY, width, height);
            } else if (cTool == "line") {
                tool.beginPath();
                tool.moveTo(iX, iY);
                tool.lineTo(fX, fY);
                tool.stroke();
                console.log("line tool is pending")
            }
        }
    })
    body.addEventListener("mousemove", function (e) {
        if (drawingMode == false)
            return;
        fX = e.clientX - boardLeft;
        fY = e.clientY - boardTop;
        tool.lineTo(fX, fY);
        tool.stroke();
        iX = fX;
        iY = fY;
    })


    /*__________________________________________________________________________________For Mobile Touch___________________________________________________________________________ */
// Prevent default touch actions for the entire document
document.body.addEventListener("touchstart", function(e) {
    if (e.target == canvasBoard) {
        e.preventDefault();
    }
}, { passive: false });

document.body.addEventListener("touchmove", function(e) {
    if (e.target == canvasBoard) {
        e.preventDefault();
    }
}, { passive: false });


    body.addEventListener("touchstart", function (e) {
        e.preventDefault(); // Prevent default touch behavior (e.g., scrolling)
        let touch = e.touches[0];
        iX = touch.clientX - boardLeft;
        iY = touch.clientY - boardTop;
        if (cTool == "pencil" || cTool == "eraser") {
            drawingMode = true;
            tool.beginPath();
            tool.moveTo(iX, iY);
        }
    });
    
    body.addEventListener("touchmove", function (e) {
        e.preventDefault();
        if (drawingMode == false)
            return;
        let touch = e.touches[0];
        fX = touch.clientX - boardLeft;
        fY = touch.clientY - boardTop;
        tool.lineTo(fX, fY);
        tool.stroke();
        iX = fX;
        iY = fY;
    });

    body.addEventListener("touchend", function (e) {
        if (cTool == "pencil" || cTool == "eraser") {
            drawingMode = false;
        }
    });