import test from 'ava';
import stringify from '../../../lib/utils/stringify';

test('lib/utils/stringify', t => {
	t.is(toString.call(stringify), '[object Function]');
	t.deepEqual(stringify([
		{
			loader: 'a-loader',
			options: {
				paramA: 'A',
				paramB: 'B',
			},
		}, {
			loader: 'b-loader',
		}, {
			loader: 'c-loader',
			options: {
				paramC: 'C',
			},
		}, {
			loader: 'd-loader',
			options: {
				paramD: 'D',
			},
		},
	]), 'a-loader?{"paramA":"A","paramB":"B"}!b-loader!c-loader?{"paramC":"C"}!d-loader?{"paramD":"D"}');
});
