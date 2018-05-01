"use strict";
/**
 * Class PageTransitionHelper
 */
Object.defineProperty(exports, "__esModule", { value: true });
var PageTransitionHelper = /** @class */ (function () {
    function PageTransitionHelper(router) {
        var _this = this;
        this.FORWARD_TRANSITION = 'forward';
        this.BACK_TRANSITION = 'back';
        this.state = this.FORWARD_TRANSITION;
        this.isPopState = false;
        window.addEventListener('popstate', function () {
            _this.onPopState();
        });
        router.beforeEach(function (to, from, next) {
            _this.setTransitionState();
            next();
        });
    }
    PageTransitionHelper.prototype.onPopState = function () {
        this.isPopState = true;
    };
    PageTransitionHelper.prototype.setTransitionState = function () {
        if (this.isPopState === true) {
            this.state = this.BACK_TRANSITION;
        }
        else {
            this.state = this.FORWARD_TRANSITION;
        }
        this.isPopState = false;
    };
    /**
     * @returns {string} - type of transition: 'forward', 'back'
     */
    PageTransitionHelper.prototype.getState = function () {
        return this.state;
    };
    return PageTransitionHelper;
}());
exports.VuePageTransitionHelper = {
    __instance: null,
    __installed: false,
    install: function (Vue, _a) {
        var router = _a.router;
        if (this.__installed)
            return;
        if (!router) {
            console.warn('router is not undefined!');
            return;
        }
        this.__installed = true;
        this.__instance = new PageTransitionHelper(router);
    },
    getState: function () {
        if (this.__instance) {
            return this.__instance.getState();
        }
        else {
            console.warn('VuePageTransitionHelper is not installed!');
            return '';
        }
    }
};
