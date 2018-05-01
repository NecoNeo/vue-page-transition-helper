/**/

class PageTransitionHelper {

  readonly FORWARD_TRANSITION = 'forward';
  readonly BACK_TRANSITION = 'back';

  private state = this.FORWARD_TRANSITION;
  private isPopState = false;
  
  constructor(router) {
    window.addEventListener('popstate', () => {
      this.onPopState();
    })
    router.beforeEach((to, from, next) => {
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

  public getState() {
    return this.state;
  }
}

export const VuePageTransitionHelper = {
  install(Vue, { router }) {
    const helper: PageTransitionHelper = new PageTransitionHelper(router)
  }
}
