import appStateManager from "../lib/appManagers/appStateManager";
import { getDeepProperty } from "../helpers/object";
import { LangPackKey, _i18n } from "../lib/langPack";

export default class RadioField {
  public input: HTMLInputElement;
  public label: HTMLLabelElement;
  public main: HTMLElement;

  constructor(options: {
    text?: LangPackKey, 
    name: string, 
    value?: string, 
    stateKey?: string
  }) {
    const label = this.label = document.createElement('label');
    label.classList.add('radio-field');
  
    const input = this.input = document.createElement('input');
    input.type = 'radio';
    /* input.id =  */input.name = 'input-radio-' + options.name;
  
    if(options.value) {
      input.value = options.value;
  
      if(options.stateKey) {
        appStateManager.getState().then(state => {
          input.checked = getDeepProperty(state, options.stateKey) === options.value;
        });
    
        input.addEventListener('change', () => {
          appStateManager.setByKey(options.stateKey, options.value);
        });
      }
    }
  
    const main = this.main = document.createElement('div');
    main.classList.add('radio-field-main');
  
    if(options.text) {
      _i18n(main, options.text);
      /* const caption = document.createElement('div');
      caption.classList.add('radio-field-main-caption');
      caption.innerHTML = text;
  
      if(subtitle) {
        label.classList.add('radio-field-with-subtitle');
        caption.insertAdjacentHTML('beforeend', `<div class="radio-field-main-subtitle">${subtitle}</div>`);
      }
  
      main.append(caption); */
    }
  
    label.append(input, main);
  }

  get checked() {
    return this.input.checked;
  }

  set checked(checked: boolean) {
    this.setValueSilently(checked);

    const event = new Event('change', {bubbles: true, cancelable: true});
    this.input.dispatchEvent(event);
  }

  public setValueSilently(checked: boolean) {
    this.input.checked = checked;
  }
};
