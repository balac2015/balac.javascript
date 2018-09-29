/**
 * Provider 通用的 context 的提供者，可以应用在任何一个应用中
 */

import { PropTypes, Component } from 'react';

class Provider extends Component {

    // 返回代表 Context 的对象
    getChildContext () {
        return {
            store: this.props.store
        };
    }

    // 只把子组件渲染出来，不做其它事情。this.props.children 在该应用中为 <ControlPanel />
    render () {
        return this.props.children;
    }
}

// Provider.propTypes = {
//     store: PropTypes.object.isRequired
// };

// Provider.childContextTypes = {
//     store: PropTypes.object
// };

export default Provider;
