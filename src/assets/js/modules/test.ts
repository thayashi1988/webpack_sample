export default function typeScriptTest() {
	const log = function (message: string) {
		console.log(message);
	}
	log('this is typeScript Hello!!!!!');

	const h1: HTMLElement = <HTMLElement>document.querySelector('h1')
	console.log('h1:', h1);
}