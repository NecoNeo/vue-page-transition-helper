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

export const VuePageTransitionHelper = {
  __instance: PageTransitionHelper,
  install(Vue: any, { router }: any) {
    const helper: PageTransitionHelper = new PageTransitionHelper(router);
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
