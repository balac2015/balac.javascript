!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.collide=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
    (function (process){
// Generated by CoffeeScript 1.6.3
        (function() {
            var getNanoSeconds, hrtime, loadTime;

            if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
                module.exports = function() {
                    return performance.now();
                };
            } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
                module.exports = function() {
                    return (getNanoSeconds() - loadTime) / 1e6;
                };
                hrtime = process.hrtime;
                getNanoSeconds = function() {
                    var hr;
                    hr = hrtime();
                    return hr[0] * 1e9 + hr[1];
                };
                loadTime = getNanoSeconds();
            } else if (Date.now) {
                module.exports = function() {
                    return Date.now() - loadTime;
                };
                loadTime = Date.now();
            } else {
                module.exports = function() {
                    return new Date().getTime() - loadTime;
                };
                loadTime = new Date().getTime();
            }

        }).call(this);

        /*
         */

    }).call(this,_dereq_("qhDIRT"))
},{"qhDIRT":13}],2:[function(_dereq_,module,exports){
    var now = _dereq_('performance-now')
        , global = typeof window === 'undefined' ? {} : window
        , vendors = ['moz', 'webkit']
        , suffix = 'AnimationFrame'
        , raf = global['request' + suffix]
        , caf = global['cancel' + suffix] || global['cancelRequest' + suffix]

    for(var i = 0; i < vendors.length && !raf; i++) {
        raf = global[vendors[i] + 'Request' + suffix]
        caf = global[vendors[i] + 'Cancel' + suffix]
            || global[vendors[i] + 'CancelRequest' + suffix]
    }

// Some versions of FF have rAF but not cAF
    if(!raf || !caf) {
        var last = 0
            , id = 0
            , queue = []
            , frameDuration = 1000 / 60

        raf = function(callback) {
            if(queue.length === 0) {
                var _now = now()
                    , next = Math.max(0, frameDuration - (_now - last))
                last = next + _now
                setTimeout(function() {
                    var cp = queue.slice(0)
                    // Clear queue here to prevent
                    // callbacks from appending listeners
                    // to the current frame's queue
                    queue.length = 0
                    for (var i = 0; i < cp.length; i++) {
                        if (!cp[i].cancelled) {
                            cp[i].callback(last)
                        }
                    }
                }, next)
            }
            queue.push({
                handle: ++id,
                callback: callback,
                cancelled: false
            })
            return id
        }

        caf = function(handle) {
            for(var i = 0; i < queue.length; i++) {
                if(queue[i].handle === handle) {
                    queue[i].cancelled = true
                }
            }
        }
    }

    module.exports = function() {
        // Wrap in a new function to prevent
        // `cancel` potentially being assigned
        // to the native rAF function
        return raf.apply(global, arguments)
    }
    module.exports.cancel = function() {
        caf.apply(global, arguments)
    }

},{"performance-now":3}],3:[function(_dereq_,module,exports){
    module.exports=_dereq_(1)
},{"qhDIRT":13}],4:[function(_dereq_,module,exports){

// Interpolation disabled for now
// var interpolate = require('./core/interpolate');
// var cssFeature = require('feature/css');

    var timeline = _dereq_('./core/timeline');
    var dynamics = _dereq_('./core/dynamics');
    var easingFunctions = _dereq_('./core/easing-functions');

    var uid = _dereq_('./util/uid');
    var EventEmitter = _dereq_('./util/simple-emitter');

    function clamp(min, n, max) { return Math.max(min, Math.min(n, max)); }

    var VELOCITY_MIN = 0.0075;

    module.exports = Animation;

    function Animation(opts) {
        //if `new` keyword isn't provided, do it for user
        if (!(this instanceof Animation)) {
            return new Animation(opts);
        }
        var self = this;


        opts = opts || {};

        //Private state goes in this._
        this._ = {
            id: uid(),
            percent: 0,
            duration: 500,
            reverse: false,
            distance: 100,
            deceleration: 0.998
        };

        var emitter = this._.emitter = new EventEmitter();
        this._.onDestroy = function() {
            emitter.emit('destroy');
        };
        this._.onStop = function(wasCompleted) {
            emitter.emit('stop', wasCompleted);
            wasCompleted && emitter.emit('complete');
        };
        this._.onStart = function() {
            emitter.emit('start');
        };

        var precision = 10000;
        this._.onStep = function(v) {
            emitter.emit('step', Math.round(v * precision) / precision);
        };

        opts.duration && this.duration(opts.duration);
        opts.percent && this.percent(opts.percent);
        opts.easing && this.easing(opts.easing);
        opts.reverse && this.reverse(opts.reverse);
        opts.distance && this.distance(opts.distance);

        //Put this here so we don't have to call _tick in the context of our object.
        //Avoids having to use .bind() or .call() every frame.
        self._tick = function(deltaT) {
            var state = self._;

            state.onStep(animStepValue(self, state.percent));

            if (Math.abs(state.velocity) < VELOCITY_MIN) {
                state.velocity = 0;
                return self.stop();
            }
            if (state.percent === animEndPercent(self)) {
                return self.stop();
            }

            //First tick, don't up the percent
            if (!deltaT) {
                // Do nothing
            } else if (state.velocity) {
                var velocity = decayVelocity(state.velocity, deltaT, state.deceleration);
                var currentDistance = state.percent * state.distance;
                state.percent = (currentDistance - velocity) / state.distance;

                if (state.percent > 1 || state.percent < 0) {
                    state.percent = clamp(0, state.percent, 1);
                    state.velocity = 0;
                }
                state.velocity = velocity;
            } else {
                if (state.reverse) {
                    state.percent = state.percent - (deltaT / state.duration);
                } else {
                    state.percent = state.percent + (deltaT / state.duration);
                }
            }

            state.percent = clamp(0, state.percent, 1);
        };
    }

    Animation.prototype = {
        reverse: function(reverse) {
            if (arguments.length) {
                this._.reverse = !!reverse;
                return this;
            }
            return this._.reverse;
        },

        easing: function(easing) {
            var type = typeof easing;
            if (arguments.length) {
                if (type === 'function' || type === 'string' || type === 'object') {
                    this._.easing = figureOutEasing(easing);
                }
                return this;
            }
            return this._.easing;
        },

        percent: function(percent, immediate) {
            var self = this;
            if (arguments.length) {
                if (typeof percent === 'number') {
                    this._.percent = clamp(0, percent, 1);
                }
                if (!this.isRunning()) {
                    if (immediate) {
                        this._tick();
                    } else {
                        timeline.tickAction(this._.id, function() {
                            self._tick();
                            timeline.untickAction(self._.id);
                        });
                    }
                }
                return this;
            }
            return this._.percent;
        },

        distance: function(distance) {
            if (arguments.length) {
                if (typeof distance === 'number' && distance > 0) {
                    this._.distance = distance;
                }
                return this;
            }
            return this._.distance;
        },

        deceleration: function(deceleration) {
            if (arguments.length) {
                if (typeof deceleration === 'number' && deceleration > 0 && deceleration < 1) {
                    this._.deceleration = deceleration;
                }
                return this;
            }
            return this._.deceleration;
        },

        duration: function(duration) {
            if (arguments.length) {
                if (typeof duration === 'number' && duration > 0) {
                    this._.duration = duration;
                }
                return this;
            }
            return this._.duration;
        },

        isRunning: function() {
            return !!this._.isRunning;
        },

        promise: function() {
            var self = this;
            return {
                then: function(cb) {
                    self.once('stop', cb);
                }
            };
        },

        on: function(eventType, listener) {
            this._.emitter.on(eventType, listener);
            return this;
        },
        once: function(eventType, listener) {
            this._.emitter.once(eventType, listener);
            return this;
        },
        off: function(eventType, listener) {
            this._.emitter.off(eventType, listener);
            return this;
        },

        destroy: function() {
            this.stop();
            this._.onDestroy();
            this.off();
            return this;
        },

        stop: function() {
            if (!this._.isRunning) return;

            this._.isRunning = false;
            timeline.untickAction(this._.id);

            this._.onStop(animIsComplete(this));
            return this;
        },

        restart: function(immediate) {
            if (this._.isRunning) return;

            this._.percent = animStartPercent(this);

            return this.start(!!immediate);
        },

        start: function(immediate) {
            return animBegin(this, immediate);
        },

        velocity: function(velocity, immediate) {
            this._.velocity = velocity;
            return animBegin(this, immediate);
        }
    };

    function animBegin(animation, immediate) {
        if (immediate) {
            animation._tick();
        }

        animation._.isRunning = true;
        timeline.tickAction(animation._.id, animation._tick);

        animation._.onStart();
        return animation;
    }
    function animIsComplete(animation) {
        return !animation._.isRunning &&
            animation._.percent === animEndPercent(animation);
    }
    function animEndPercent(animation) {
        return animation._.reverse ? 0 : 1;
    }
    function animStartPercent(animation) {
        return animation._.reverse ? 1 : 0;
    }
    function animStepValue(animation, value) {
        if (animation._.easing) {
            return animation._.easing(value, animation._.duration);
        }
        return value;
    }

    function decayVelocity(velocity, dt, deceleration) {
        var kv = Math.pow(deceleration, dt);
        return velocity * kv;
    }

    function figureOutEasing(easing) {
        if (typeof easing === 'object') {
            var dynamicType = typeof easing.type === 'string' &&
                easing.type.toLowerCase().trim();

            if (!dynamics[dynamicType]) {
                throw new Error(
                        'Invalid easing dynamics object type "' + easing.type + '". ' +
                        'Available dynamics types: ' + Object.keys(dynamics).join(', ') + '.'
                );
            }
            return dynamics[dynamicType](easing);

        } else if (typeof easing === 'string') {
            easing = easing.toLowerCase().trim();

            if (easing.indexOf('cubic-bezier(') === 0) {
                var parts = easing
                    .replace('cubic-bezier(', '')
                    .replace(')', '')
                    .split(',')
                    .map(function(v) {
                        return v.trim();
                    });
                return easingFunctions['cubic-bezier'](parts[0], parts[1], parts[2], parts[3]);
            } else {
                var fn = easingFunctions[easing];
                if (!fn) {
                    throw new Error(
                            'Invalid easing function "' + easing + '". ' +
                            'Available easing functions: ' + Object.keys(easingFunctions).join(', ') + '.'
                    );
                }
                return easingFunctions[easing]();
            }
        } else if (typeof easing === 'function') {
            return easing;
        }
    }

// /*
//  * Tweening helpers
//  */
// function syncStyles(startingStyles, endingStyles, computedStyle) {
//   var property;
//   for (property in startingStyles) {
//     if (!endingStyles.hasOwnProperty(property)) {
//       delete startingStyles[property];
//     }
//   }
//   for (property in endingStyles) {
//     if (!startingStyles.hasOwnProperty(property)) {
//       startingStyles[property] = computedStyle[vendorizePropertyName(property)];
//     }
//   }
// }

// function makePropertyInterpolators(startingStyles, endingStyles) {
//   var interpolators = {};
//   var property;
//   for (property in startingStyles) {
//     interpolators[vendorizePropertyName(property)] = interpolate.propertyInterpolator(
//       property, startingStyles[property], endingStyles[property]
//     );
//   }
//   return interpolators;
// }

// var transformProperty;
// function vendorizePropertyName(property) {
//   if (property === 'transform') {
//     //Set transformProperty lazily, to be sure DOM has loaded already when using it
//     return transformProperty || 
//       (transformProperty = cssFeature('transform').property);
//   } else {
//     return property;
//   }
// }

},{"./core/dynamics":6,"./core/easing-functions":7,"./core/timeline":8,"./util/simple-emitter":11,"./util/uid":12}],5:[function(_dereq_,module,exports){
    /*
     * Copyright (C) 2008 Apple Inc. All Rights Reserved.
     *
     * Redistribution and use in source and binary forms, with or without
     * modification, are permitted provided that the following conditions
     * are met:
     * 1. Redistributions of source code must retain the above copyright
     *    notice, this list of conditions and the following disclaimer.
     * 2. Redistributions in binary form must reproduce the above copyright
     *    notice, this list of conditions and the following disclaimer in the
     *    documentation and/or other materials provided with the distribution.
     *
     * THIS SOFTWARE IS PROVIDED BY APPLE INC. ``AS IS'' AND ANY
     * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
     * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
     * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL APPLE INC. OR
     * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
     * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
     * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
     * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
     * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
     * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
     * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
     */

// http://www.w3.org/TR/css3-transitions/#transition-easing-function
    module.exports =  {
        /*
         * @param x {number} the value of x along the bezier curve, 0.0 <= x <= 1.0
         * @param duration {number} the duration of the animation in milliseconds
         * @return {number} the y value along the bezier curve
         */
        linear: unitBezier(0.0, 0.0, 1.0, 1.0),

        /*
         * @param x {number} the value of x along the bezier curve, 0.0 <= x <= 1.0
         * @param duration {number} the duration of the animation in milliseconds
         * @return {number} the y value along the bezier curve
         */
        ease: unitBezier(0.25, 0.1, 0.25, 1.0),

        /*
         * @param x {number} the value of x along the bezier curve, 0.0 <= x <= 1.0
         * @param duration {number} the duration of the animation in milliseconds
         * @return {number} the y value along the bezier curve
         */
        easeIn: unitBezier(0.42, 0, 1.0, 1.0),

        /*
         * @param x {number} the value of x along the bezier curve, 0.0 <= x <= 1.0
         * @param duration {number} the duration of the animation in milliseconds
         * @return {number} the y value along the bezier curve
         */
        easeOut: unitBezier(0, 0, 0.58, 1.0),

        /*
         * @param x {number} the value of x along the bezier curve, 0.0 <= x <= 1.0
         * @param duration {number} the duration of the animation in milliseconds
         * @return {number} the y value along the bezier curve
         */
        easeInOut: unitBezier(0.42, 0, 0.58, 1.0),

        /*
         * @param p1x {number} X component of control point 1
         * @param p1y {number} Y component of control point 1
         * @param p2x {number} X component of control point 2
         * @param p2y {number} Y component of control point 2
         * @param x {number} the value of x along the bezier curve, 0.0 <= x <= 1.0
         * @param duration {number} the duration of the animation in milliseconds
         * @return {number} the y value along the bezier curve
         */
        cubicBezier: function(p1x, p1y, p2x, p2y) {
            return unitBezier(p1x, p1y, p2x, p2y);
        }
    };

    function B1(t) { return t*t*t; }
    function B2(t) { return 3*t*t*(1-t); }
    function B3(t) { return 3*t*(1-t)*(1-t); }
    function B4(t) { return (1-t)*(1-t)*(1-t); }

    /*
     * JavaScript port of Webkit implementation of CSS cubic-bezier(p1x.p1y,p2x,p2y) by http://mck.me
     * http://svn.webkit.org/repository/webkit/trunk/Source/WebCore/platform/graphics/UnitBezier.h
     */

    /*
     * Duration value to use when one is not specified (400ms is a common value).
     * @const
     * @type {number}
     */
    var DEFAULT_DURATION = 400;//ms

    /*
     * The epsilon value we pass to UnitBezier::solve given that the animation is going to run over |dur| seconds.
     * The longer the animation, the more precision we need in the easing function result to avoid ugly discontinuities.
     * http://svn.webkit.org/repository/webkit/trunk/Source/WebCore/page/animation/AnimationBase.cpp
     */
    function solveEpsilon(duration) {
        return 1.0 / (200.0 * duration);
    }

    /*
     * Defines a cubic-bezier curve given the middle two control points.
     * NOTE: first and last control points are implicitly (0,0) and (1,1).
     * @param p1x {number} X component of control point 1
     * @param p1y {number} Y component of control point 1
     * @param p2x {number} X component of control point 2
     * @param p2y {number} Y component of control point 2
     */
    function unitBezier(p1x, p1y, p2x, p2y) {

        // private members --------------------------------------------

        // Calculate the polynomial coefficients, implicit first and last control points are (0,0) and (1,1).

        /*
         * X component of Bezier coefficient C
         * @const
         * @type {number}
         */
        var cx = 3.0 * p1x;

        /*
         * X component of Bezier coefficient B
         * @const
         * @type {number}
         */
        var bx = 3.0 * (p2x - p1x) - cx;

        /*
         * X component of Bezier coefficient A
         * @const
         * @type {number}
         */
        var ax = 1.0 - cx -bx;

        /*
         * Y component of Bezier coefficient C
         * @const
         * @type {number}
         */
        var cy = 3.0 * p1y;

        /*
         * Y component of Bezier coefficient B
         * @const
         * @type {number}
         */
        var by = 3.0 * (p2y - p1y) - cy;

        /*
         * Y component of Bezier coefficient A
         * @const
         * @type {number}
         */
        var ay = 1.0 - cy - by;

        /*
         * @param t {number} parametric easing value
         * @return {number}
         */
        var sampleCurveX = function(t) {
            // `ax t^3 + bx t^2 + cx t' expanded using Horner's rule.
            return ((ax * t + bx) * t + cx) * t;
        };

        /*
         * @param t {number} parametric easing value
         * @return {number}
         */
        var sampleCurveY = function(t) {
            return ((ay * t + by) * t + cy) * t;
        };

        /*
         * @param t {number} parametric easing value
         * @return {number}
         */
        var sampleCurveDerivativeX = function(t) {
            return (3.0 * ax * t + 2.0 * bx) * t + cx;
        };

        /*
         * Given an x value, find a parametric value it came from.
         * @param x {number} value of x along the bezier curve, 0.0 <= x <= 1.0
         * @param epsilon {number} accuracy limit of t for the given x
         * @return {number} the t value corresponding to x
         */
        var solveCurveX = function(x, epsilon) {
            var t0;
            var t1;
            var t2;
            var x2;
            var d2;
            var i;

            // First try a few iterations of Newton's method -- normally very fast.
            for (t2 = x, i = 0; i < 8; i++) {
                x2 = sampleCurveX(t2) - x;
                if (Math.abs (x2) < epsilon) {
                    return t2;
                }
                d2 = sampleCurveDerivativeX(t2);
                if (Math.abs(d2) < 1e-6) {
                    break;
                }
                t2 = t2 - x2 / d2;
            }

            // Fall back to the bisection method for reliability.
            t0 = 0.0;
            t1 = 1.0;
            t2 = x;

            if (t2 < t0) {
                return t0;
            }
            if (t2 > t1) {
                return t1;
            }

            while (t0 < t1) {
                x2 = sampleCurveX(t2);
                if (Math.abs(x2 - x) < epsilon) {
                    return t2;
                }
                if (x > x2) {
                    t0 = t2;
                } else {
                    t1 = t2;
                }
                t2 = (t1 - t0) * 0.5 + t0;
            }

            // Failure.
            return t2;
        };

        /*
         * @param x {number} the value of x along the bezier curve, 0.0 <= x <= 1.0
         * @param epsilon {number} the accuracy of t for the given x
         * @return {number} the y value along the bezier curve
         */
        var solve = function(x, epsilon) {
            return sampleCurveY(solveCurveX(x, epsilon));
        };

        // public interface --------------------------------------------

        /*
         * Find the y of the cubic-bezier for a given x with accuracy determined by the animation duration.
         * @param x {number} the value of x along the bezier curve, 0.0 <= x <= 1.0
         * @param duration {number} the duration of the animation in milliseconds
         * @return {number} the y value along the bezier curve
         */
        return function(x, duration) {
            return solve(x, solveEpsilon(+duration || DEFAULT_DURATION));
        };
    }


},{}],6:[function(_dereq_,module,exports){
    /**
     * A HUGE thank you to dynamics.js which inspired these dynamics simulations.
     * https://github.com/michaelvillar/dynamics.js
     *
     * Also licensed under MIT
     */

    var extend = _dereq_('../util/extend');

    module.exports = {
        spring: dynamicsSpring,
        gravity: dynamicsGravity
    };

    var springDefaults = {
        frequency: 15,
        friction: 200,
        anticipationStrength: 0,
        anticipationSize: 0
    };
    function dynamicsSpring(opts) {
        opts = extend({}, springDefaults, opts || {});

        return function at(t, duration) {
            var A, At, a, angle, b, decal, frequency, friction, frictionT, s, v, y0, yS,
                _opts = opts;
            frequency = Math.max(1, opts.frequency);
            friction = Math.pow(20, opts.friction / 100);
            s = opts.anticipationSize / 100;
            decal = Math.max(0, s);
            frictionT = (t / (1 - s)) - (s / (1 - s));
            if (t < s) {
                A = function(t) {
                    var M, a, b, x0, x1;
                    M = 0.8;
                    x0 = s / (1 - s);
                    x1 = 0;
                    b = (x0 - (M * x1)) / (x0 - x1);
                    a = (M - b) / x0;
                    return (a * t * _opts.anticipationStrength / 100) + b;
                };
                yS = (s / (1 - s)) - (s / (1 - s));
                y0 = (0 / (1 - s)) - (s / (1 - s));
                b = Math.acos(1 / A(yS));
                a = (Math.acos(1 / A(y0)) - b) / (frequency * (-s));
            } else {
                A = function(t) {
                    return Math.pow(friction / 10, -t) * (1 - t);
                };
                b = 0;
                a = 1;
            }
            At = A(frictionT);
            angle = frequency * (t - s) * a + b;
            v = 1 - (At * Math.cos(angle));
            //return [t, v, At, frictionT, angle];
            return v;
        };
    }

    var gravityDefaults = {
        bounce: 40,
        gravity: 1000,
        initialForce: false
    };
    function dynamicsGravity(opts) {
        opts = extend({}, gravityDefaults, opts || {});
        var curves = [];

        init();

        return at;

        function length() {
            var L, b, bounce, curve, gravity;
            bounce = Math.min(opts.bounce / 100, 80);
            gravity = opts.gravity / 100;
            b = Math.sqrt(2 / gravity);
            curve = {
                a: -b,
                b: b,
                H: 1
            };
            if (opts.initialForce) {
                curve.a = 0;
                curve.b = curve.b * 2;
            }
            while (curve.H > 0.001) {
                L = curve.b - curve.a;
                curve = {
                    a: curve.b,
                    b: curve.b + L * bounce,
                    H: curve.H * bounce * bounce
                };
            }
            return curve.b;
        }

        function init() {
            var L, b, bounce, curve, gravity, _results;

            L = length();
            gravity = (opts.gravity / 100) * L * L;
            bounce = Math.min(opts.bounce / 100, 80);
            b = Math.sqrt(2 / gravity);
            curves = [];
            curve = {
                a: -b,
                b: b,
                H: 1
            };
            if (opts.initialForce) {
                curve.a = 0;
                curve.b = curve.b * 2;
            }
            curves.push(curve);
            _results = [];
            while (curve.b < 1 && curve.H > 0.001) {
                L = curve.b - curve.a;
                curve = {
                    a: curve.b,
                    b: curve.b + L * bounce,
                    H: curve.H * bounce * bounce
                };
                _results.push(curves.push(curve));
            }
            return _results;
        }

        function calculateCurve(a, b, H, t){
            var L, c, t2;
            L = b - a;
            t2 = (2 / L) * t - 1 - (a * 2 / L);
            c = t2 * t2 * H - H + 1;
            if (opts.initialForce) {
                c = 1 - c;
            }
            return c;
        }

        function at(t, duration) {
            var bounce, curve, gravity, i, v;
            bounce = opts.bounce / 100;
            gravity = opts.gravity;
            i = 0;
            curve = curves[i];
            while (!(t >= curve.a && t <= curve.b)) {
                i += 1;
                curve = curves[i];
                if (!curve) {
                    break;
                }
            }
            if (!curve) {
                v = opts.initialForce ? 0 : 1;
            } else {
                v = calculateCurve(curve.a, curve.b, curve.H, t);
            }
            //return [t, v];
            return v;
        }

    };

},{"../util/extend":10}],7:[function(_dereq_,module,exports){
    var dynamics = _dereq_('./dynamics');
    var bezier = _dereq_('./bezier');

    module.exports = {
        'linear': function() {
            return function(t, duration) {
                return bezier.linear(t, duration);
            };
        },
        'ease': function() {
            return function(t, duration) {
                return bezier.ease(t, duration);
            };
        },
        'ease-in': function() {
            return function(t, duration) {
                return bezier.easeIn(t, duration);
            };
        },
        'ease-out': function() {
            return function(t, duration) {
                return bezier.easeOut(t, duration);
            };
        },
        'ease-in-out': function() {
            return function(t, duration) {
                return bezier.easeInOut(t, duration);
            };
        },
        'cubic-bezier': function(x1, y1, x2, y2, duration) {
            var bz = bezier.cubicBezier(x1, y1, x2, y2);//, t, duration);
            return function(t, duration) {
                return bz(t, duration);
            };
        }
    };

},{"./bezier":5,"./dynamics":6}],8:[function(_dereq_,module,exports){

    var raf = _dereq_('raf');
    var time = _dereq_('performance-now');

    var self = module.exports = {
        _actions: {},
        isTicking: false,

        tickAction: function(id, action) {
            self._actions[id] = action;

            if (!self.isTicking) {
                self.tick();
            }
        },

        untickAction: function(id) {
            delete self._actions[id];
            self.maybeStopTicking();
        },

        tick: function() {
            var lastFrame = time();

            self.isTicking = true;
            self._rafId = raf(step);

            function step() {
                self._rafId = raf(step);

                // Get current time
                var now = time();
                var deltaT = now - lastFrame;

                for (var id in self._actions) {
                    self._actions[id](deltaT);
                }

                lastFrame = now;
            }
        },

        maybeStopTicking: function() {
            if (self.isTicking && !Object.keys(self._actions).length) {
                raf.cancel(self._rafId);
                self.isTicking = false;
            }
        }

    };


},{"performance-now":1,"raf":2}],9:[function(_dereq_,module,exports){
    module.exports = {
        animation: _dereq_('./animation')
    };

},{"./animation":4}],10:[function(_dereq_,module,exports){

    /*
     * There really is no tiny minimal extend() on npm to find,
     * so we just use our own.
     */

    module.exports = function extend(obj) {
        var args = Array.prototype.slice.call(arguments, 1);
        for(var i = 0; i < args.length; i++) {
            var source = args[i];
            if (source) {
                for (var prop in source) {
                    obj[prop] = source[prop];
                }
            }
        }
        return obj;
    };

},{}],11:[function(_dereq_,module,exports){

// All we want is an eventEmitter that doesn't use #call or #apply,
// by expecting 0-1 arguments. 
// We couldn't find this on npm, so we make our own.

    module.exports = SimpleEventEmitter;

    function SimpleEventEmitter() {
        this.listeners = [];
    }

    SimpleEventEmitter.prototype = {
        on: function(eventType, fn) {
            if (typeof fn !== 'function') return;
            this.listeners[eventType] || (this.listeners[eventType] = []);
            this.listeners[eventType].push(fn);
        },
        once: function(eventType, fn) {
            var self = this;
            function onceFn() {
                self.off(eventType, fn);
                self.off(eventType, onceFn);
            }
            this.on(eventType, fn);
            this.on(eventType, onceFn);
        },
        // Built-in limitation: we only expect 0-1 arguments
        // This is to save as much perf as possible when sending
        // events every frame.
        emit: function(eventType, eventArg) {
            var listeners = this.listeners[eventType] || [];
            var i = 0;
            var len = listeners.length;
            if (arguments.length === 2) {
                for (i; i < len; i++) listeners[i] && listeners[i](eventArg);
            } else {
                for (i; i < len; i++) listeners[i] && listeners[i]();
            }
        },
        off: function(eventType, fnToRemove) {
            if (!eventType) {
                //Remove all listeners
                for (var type in this.listeners) {
                    this.off(type);
                }
            } else  {
                var listeners = this.listeners[eventType];
                if (listeners) {
                    if (!fnToRemove) {
                        listeners.length = 0;
                    } else {
                        var index = listeners.indexOf(fnToRemove);
                        listeners.splice(index, 1);
                    }
                }
            }
        }
    };

},{}],12:[function(_dereq_,module,exports){

    /**
     * nextUid() from angular.js
     * License MIT
     * http://github.com/angular/angular.js
     *
     * A consistent way of creating unique IDs in angular. The ID is a sequence of alpha numeric
     * characters such as '012ABC'. The reason why we are not using simply a number counter is that
     * the number string gets longer over time, and it can also overflow, where as the nextId
     * will grow much slower, it is a string, and it will never overflow.
     *
     * @returns an unique alpha-numeric string
     */
    var uid = [];

    module.exports = function nextUid() {
        var index = uid.length;
        var digit;

        while(index) {
            index--;
            digit = uid[index].charCodeAt(0);
            if (digit == 57 /*'9'*/) {
                uid[index] = 'A';
                return uid.join('');
            }
            if (digit == 90  /*'Z'*/) {
                uid[index] = '0';
            } else {
                uid[index] = String.fromCharCode(digit + 1);
                return uid.join('');
            }
        }
        uid.unshift('0');
        return uid.join('');
    };

},{}],13:[function(_dereq_,module,exports){
// shim for using process in browser

    var process = module.exports = {};

    process.nextTick = (function () {
        var canSetImmediate = typeof window !== 'undefined'
            && window.setImmediate;
        var canPost = typeof window !== 'undefined'
                && window.postMessage && window.addEventListener
            ;

        if (canSetImmediate) {
            return function (f) { return window.setImmediate(f) };
        }

        if (canPost) {
            var queue = [];
            window.addEventListener('message', function (ev) {
                var source = ev.source;
                if ((source === window || source === null) && ev.data === 'process-tick') {
                    ev.stopPropagation();
                    if (queue.length > 0) {
                        var fn = queue.shift();
                        fn();
                    }
                }
            }, true);

            return function nextTick(fn) {
                queue.push(fn);
                window.postMessage('process-tick', '*');
            };
        }

        return function nextTick(fn) {
            setTimeout(fn, 0);
        };
    })();

    process.title = 'browser';
    process.browser = true;
    process.env = {};
    process.argv = [];

    function noop() {}

    process.on = noop;
    process.addListener = noop;
    process.once = noop;
    process.off = noop;
    process.removeListener = noop;
    process.removeAllListeners = noop;
    process.emit = noop;

    process.binding = function (name) {
        throw new Error('process.binding is not supported');
    }

// TODO(shtylman)
    process.cwd = function () { return '/' };
    process.chdir = function (dir) {
        throw new Error('process.chdir is not supported');
    };

},{}]},{},[9])
(9)
});