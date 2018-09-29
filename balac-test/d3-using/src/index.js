import { select, selectAll } from 'd3-selection';
import { transition } from 'd3-transition';

/**
 * dynamic properties
 */

select('body')
	.style('background-color', '#f2f2f2');

selectAll('p')
	.style('color', function () {
		return 'hsl(' + Math.random() * 360 + ', 100%, 50%)';
	});

selectAll('div')
	.style('color', function (d, i) {
		return i % 2 ? '#fff' : '#eee';
	});


/**
 * enter and exit
 */

select('body')
	.selectAll('p')
	.data([4, 8, 15, 16, 23, 42])
	.enter().append('p')
		.text(function (d) {
			return "i'm number " + d + "!";
		});

// update...
var p = select('body')
	.selectAll('p')
	.data([4, 8, 15, 16, 23, 42])
	.text(function (d) {
		return d;
	});

// enter...
p.enter().append('p')
	.text(function (d) {
		return d;
	});

// exit...
p.exit().remove();


/**
 * transitions
 */

select('body').transition()
	.style('background-color', 'black')

selectAll('circle').transition()
	.duration(750)
	.delay(function (d, i) {
		return i * 10;
	})
	.attr('r', function (d) {
		return Math.sqrt(d * scale);
	});