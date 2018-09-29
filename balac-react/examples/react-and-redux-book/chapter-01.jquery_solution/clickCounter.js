var element = function () {
    var div = document.createElement('div');
    div.innerHTML = `
        <button id="clickMe">Click Me</button>
        <div>
            Click Count: <span id="clickCount">0</span>
        </div>
    `;

    return listener.call(div);
};

var listener = function () {
    var btn = this.querySelector('#clickMe'),
        content = this.querySelector('#clickCount');

    // btn.onclick = function () {
    //     var counter = parseInt(content.innerText, 10);
    //     content.innerText = counter + 1;
    // };

    btn.addEventListener('click', function () {
        var counter = parseInt(content.innerText, 10);
        content.innerText = counter + 1;
    }, false);

    return this;
};

export default element;
