require('./style/about.css');
require('bootstrap/scss/bootstrap.scss');

var bootstrap = `
    <span class="badge badge-secondary">New</span>
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
