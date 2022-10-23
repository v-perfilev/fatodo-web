import {MutableRefObject} from 'react';

export class InputUtils {
  public static clear = (ref: MutableRefObject<HTMLInputElement>): void => {
    let nativeInputValueSetter;
    try {
      nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      nativeInputValueSetter.call(ref.current, '');
    } catch (e) {
      nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
      nativeInputValueSetter.call(ref.current, '');
    }
    const simulatedEvent = new Event('input', {bubbles: true});
    ref.current.dispatchEvent(simulatedEvent);
  };
}
