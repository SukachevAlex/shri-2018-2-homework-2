let currentGesture = {
    startX: null,
    startY: null,
    prevX: null,
    prevY: null
};

export function mouseDown(image, e) {

    currentGesture = {
        startX: e.x,
        startY: e.y,
        prevX: parseInt(e.target.style.backgroundPositionX),
        prevY: parseInt(e.target.style.backgroundPositionY)
    };

    image.setPointerCapture(e.pointerId);
}

export function mouseMove(e) {

    if (e.target.hasPointerCapture && e.target.hasPointerCapture(e.pointerId)) {
        const dx = e.x - currentGesture.startX;
        const dy = e.y - currentGesture.startY;

        e.target.style.backgroundPositionX = `${currentGesture.prevX + dx}px`;
        e.target.style.backgroundPositionY = `${currentGesture.prevY + dy}px`;
    }
}

export function mouseUp(e) {}