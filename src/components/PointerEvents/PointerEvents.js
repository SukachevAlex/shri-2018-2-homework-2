let gesture = {
    startX: null,
    startY: null,
    startLength: null,
    prevX: null,
    prevY: null
};

let events = [];

export function mouseDown(eventImage, e) {

    events.push(e);
    gesture = {
        startX: e.x,
        startY: e.y,
        startLength: 0,
        prevX: parseInt(e.target.style.backgroundPositionX),
        prevY: parseInt(e.target.style.backgroundPositionY),
    };

    if (events.length === 2) {
        let dx = events[1].clientX - events[0].clientX;
        let dy = events[1].clientY - events[0].clientY;

        gesture.startLength = getLength(dx, dy);
    }

    eventImage.setPointerCapture(e.pointerId);
}

export function mouseMove(imageInfo, e) {

    for (let i = 0; i < events.length; i++) {
        if (e.pointerId === events[i].pointerId) {
            events[i] = e;
        }
    }

    if (e.target.hasPointerCapture && e.target.hasPointerCapture(e.pointerId)) {

        if (events.length === 1) {
            const dx = e.x - gesture.startX;
            const dy = e.y - gesture.startY;

            e.target.style.backgroundPositionX = `${gesture.prevX + dx}px`;
        } else if (events.length === 2) {
            const zoomField = imageInfo.querySelector('.zoom__value');
            const fluency = 25;

            let dx = events[1].clientX - events[0].clientX;
            let dy = events[1].clientY - events[0].clientY;

            let length = getLength(dx, dy) - gesture.startLength;
            let zoomPrev = parseInt(e.target.style.backgroundSize);
            let currZoom = Math.min(400, Math.max(100, parseInt(zoomPrev + length / fluency)));
            e.target.style.backgroundSize = `${currZoom}%`;
            zoomField.textContent = `${currZoom - 100}%`;
        }
    }
}

export function mouseUp(e) {
    events.pop();
}

function getLength(dx, dy) {
    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
}