// Write your JavaScript code.
function ObterCharCodeDeChar(char) {
    return char.charCodeAt(0) - 32;
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function isCollide(a, b) {
    return !(
        ((a.PosY + a.TamanhoY) < (b.PosY)) ||
        (a.PosY > (b.PosY + b.TamanhoY)) ||
        ((a.PosX + a.TamanhoX) < b.PosX) ||
        (a.PosX > (b.PosX + b.TamanhoX))
    );
}