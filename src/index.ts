/**
 * Class PageTransitionHelper
 */

class PageTransitionHelper {

  readonly FORWARD_TRANSITION = 'forward';
  readonly BACK_TRANSITION = 'back';

  private state = this.FORWARD_TRANSITION;
  private isPopState = false;
  
  constructor(router: any) {
    window.addEventListener('popstate', () => {
      this.onPopState();
    })
    router.beforeEach((to: any, from: any, next: any) => {
      this.setTransitionState();
      next();
    })
  }

  private onPopState() {
    this.isPopState = true;
  }

  private setTransitionState() {
    if (this.isPopState === true) {
      this.state = this.BACK_TRANSITION;
    } else {
      this.state = this.FORWARD_TRANSITION;
    }
    this.isPopState = false;
  }

  /**
   * @returns {string} - type of transition: 'forward', 'back'
   */
  public getState(): string {
    return this.state;
  }
}

export const VuePageTransitionHelper: {
  __instance?: PageTransitionHelper,
  __installed: boolean,
  install(Vue: any, { router }: any): void,
  getState(): string
} = {
  __instance: null,
  __installed: false,
  install(Vue: any, { router }) {
    if (this.__installed) return;
    if (!router) {
      console.warn('router is not undefined!');
      return;
    }
    this.__installed = true;
    this.__instance = new PageTransitionHelper(router);
  },
  getState(): string {
    if (this.__instance) {
      return this.__instance.getState();
    } else {
      console.warn('VuePageTransitionHelper is not installed!');
      return '';
    }
  }
}
