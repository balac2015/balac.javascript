/**
 * 条件渲染
 * 当条件变得太复杂时，可能是提取组件的好时机。
 */

// 元素变量
let button = null;
if (true) {
    button = <LogoutButton onClick={ this.handleLogoutClick } />;
} else {
    button = <LoginButton onClick={ this.handleLoginClick } />;
}
return (
    <div>{ button }</div>
);


// 使用逻辑 && 操作符的内联 if 用法。true && expression => expression
const unreadMessages = props.unreadMessages;
return (
    <div>
        { unreadMessages.length > 0 &&
            <h2>
                You have {unreadMessages.length} unread messages.
            </h2>
        }
    </div>
);

// 使用条件操作符的内联 If-Else。condition ? true : false
const isLoggedIn = this.state.isLoggedIn;
return (
    <div>
        { isLoggedIn ? (
            <LogoutButton onClick={this.handleLogoutClick} />
        ) : (
            <LoginButton onClick={this.handleLoginClick} />
        )}
);

// 防止组件渲染
// 从组件的 render 方法返回 null 不会影响组件生命周期方法的触发。 例如， componentWillUpdate 和 componentDidUpdate 仍将被调用。
function WarningBanner(props) {
    if (!props.warn) {
        return null;    // 则该组件不渲染：
    }

    return (
        <div className="warning">
            Warning!
        </div>
    );
}
