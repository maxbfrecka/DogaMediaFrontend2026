const { render, screen } = require('@testing-library/react');
const HelloWorld = require('./helloWorld');

test('renders hello world text', () => {
	render(<HelloWorld />);
	const linkElement = screen.getByText(/hello world/i);
	expect(linkElement).toBeInTheDocument();
});