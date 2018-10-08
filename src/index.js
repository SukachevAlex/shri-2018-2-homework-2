import './style.sass';
import {generateEvents} from './components/Event/Event';

(function () {
    const data = require('./data/events.json');
    const events = data.events;

    if (supportsTemplate) {
        events.forEach(el => generateEvents(el));
    } else {
        console.log('sad');
    }
})();

function supportsTemplate() {
    return 'content' in document.createElement('template');
}
