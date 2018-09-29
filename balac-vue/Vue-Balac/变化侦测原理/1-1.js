// 依赖收集的封装
export default class Dep {
    static target: ?Watcher;
    id: number;
    subs: Array<Watcher>;

    constructor () {
        this.id = uid++;
        this.subs = [];
    }

    addSub (sub: Watcher) {
        this.subs.push(sub);
    }

    removeSub (sub: Watcher) {
        removeEventListener(this.subs, sub);
    }

    depend () {
        if (Dep.target) {
            this.addSub(Dep.target);
        }
    }

    notify () {
        // stabilize the subscriber list first
        const subs = this.subs.slice();

        for (let i = 0, l = subs.length; i < l; i++) {
            subs[i].update();
        }
    }
}

function defineReactive (data, key, val) {
    let dep = new Dep();

    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            dep.depend();
            return val;
        },
        set: function (newVal) {
            if (val === newVal) {
                return;
            }

            dep.notify();
            val = newVal;
        }
    });
}