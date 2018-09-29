require('./style/main.css');
require('bootstrap/scss/bootstrap.scss');

var bootstrap = `
    <div class="alert alert-primary" role="alert">
        bootstrap4 scss 源码调用（sass-loader）
    </div>
`;

var create = function () {
    var elem = document.createElement('div'),
        text = '<p>css 文件调用（css-loader, style-loader）</p>';

    elem.className = 'component-box';
    elem.innerHTML = text + bootstrap;

    return elem;
};
var elem = create();
document.body.appendChild(elem);
