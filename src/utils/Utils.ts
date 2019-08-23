export default class Utils {
  static getFormattedEvents(eventsData):any {
    const formattedEvents = {};

    for (let i = 0; i < eventsData.length; i += 1) {
      const currEvent = eventsData[i];
      const currEventName = currEvent.name ? currEvent.name : currEvent.event;
      const currEventAddr = currEvent.address;
      const currEventParams = currEvent.events
        ? currEvent.events
        : currEvent.args;

      formattedEvents[currEventName] = {address: currEventAddr};

      if (Array.isArray(currEventParams)) {
        for (let j = 0; j < currEventParams.length; j += 1) {
          const p = currEventParams[j];
          formattedEvents[currEventName][p.name] = p.value;
        }
      } else {
        formattedEvents[currEventName] = currEventParams;
      }
    }

    return formattedEvents;
  }
}
