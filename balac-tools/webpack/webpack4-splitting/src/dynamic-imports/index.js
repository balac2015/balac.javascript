async function getComponent () {
	var element = document.createElement('div');

	const _ = await import(/* webpackChunkName: "lodash" */ 'lodash');

	element.innerHTML = _.join(['Hello', 'webpack'], ' ');

	return element;
}

function getComponent1 () {

	return import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {

		var element = document.createElement('div');

		element.innerHTML = _.join(['Hello', 'webpack'], ' ');

		return element;
	}).catch(
		error => 'An error occurred while loading the component'
	);
}

getComponent().then(component => {
	if (typeof component === 'object') {
		return document.body.appendChild(component);
	}

	if (typeof component === 'string') {
		return console.log('error: %s', component);
	}
});