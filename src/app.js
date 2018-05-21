import {PLATFORM} from 'aurelia-pal';

export class App {
  constructor() {
    
  }

  configureRouter(config, router){
    config.title = 'Net Present Value';
    config.map([
      { route: '', moduleId: PLATFORM.moduleName('components/npv/calculator'),   title: 'Calculator' }
    ]);
  }
}
