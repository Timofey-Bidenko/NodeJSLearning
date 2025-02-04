class EventEmitter {

    constructor() {
        this.events = {}
    }

    addEventListener(onEvent, newCb) {
        if (!this.events[onEvent]) {
            this.events[onEvent] = []
        }
        this.events[onEvent].push(newCb)
    }

    fireEvent(onEventName, ...args) {
        if (!this.events[onEventName]) return false;
        this.events[onEventName].forEach(cb => {
            setTimeout(() => {
                cb(...args)
            }, 0);
        });
    }

    removeEventListener(onEvent, removeCb) {
        if (!this.events[onEvent]) return false;
        this.events[onEvent] = this.events[onEvent].filter(cb => cb !== removeCb)
    }
}

export default EventEmitter