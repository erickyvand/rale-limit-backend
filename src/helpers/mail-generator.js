import Mailgen from 'mailgen';

const mailGenerator = new Mailgen({
	theme: 'default',
	product: {
		name: 'Security service',
		link: 'https://example.com',
	},
});

export default mailGenerator;
