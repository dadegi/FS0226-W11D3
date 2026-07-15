console.log('Hello World!');
// Dal punto di vista logico e strutturale TypeScript segue esattamente i metodi JavaScript

// I tipi di dati sono gli stessi di JS: string, number, boolean etc.
// I tipi di dato vanno applicati alle variabili

let myName;
// Una variabile definita senza valore e senza tipo è any, può diventare qualunque cosa
myName = 'Pippo';
myName = 5;
console.log(myName);
// Quando si determina in fase di inizializzazione il tipo della variabile, quel tipo non può più cambiare
let studentName = 'Angelo';
// studentName = 3; // ERRORE! Una variabile istanziata come string non può diventare number né niente altro
console.log(studentName);
// Quando non c'è un valore di partenza il tipo può essere assegnato con la sintassi [variabile]: [tipo]
let courseYear: number;
courseYear = 2026; // Corretto
// courseYear = 'Mario' // ERRORE! Non si può cambiare il tipo di una variabile

// Stessa cosa per le costanti, che come in JS devono essere inizializzate subito
const COURSE_NAME: string = 'FS0226AI';

// L'intervento sull'HTML è identico a JS
const PAGE_TITLE = 'Introduzione a TypeScript';
const pageTitle = document.getElementById('pageTitle');
pageTitle.textContent = PAGE_TITLE;

// È possibile definire dei tipi personalizzati (Custom Types) direttamente in fase di istanziazione della variabile o utilizzando la keyword type, se il tipo personalizzato serve in più occasioni; in entrambi i casi si definisce l'unione di due o più tipi utilizzando il pipe (|)
let courseDate: string | number;
courseDate = 2026;
console.log(courseDate);
courseDate = '04/05/2026';
console.log(courseDate);

type myDateType = string | number; // Custom Type
let myCourseYear: myDateType = 2026;
console.log(myCourseYear);
let myStartDate: myDateType = '04/05/2026';
console.log(myStartDate);

// ARRAY
// Possono essere definiti come array vuoti, tipizzati o any
const myFirstArray = [];
const mySecondArray: number[] = [];
myFirstArray.push(1, 'Mario', false);
console.log(myFirstArray);

mySecondArray.push(1, 2, 3, 4, 5);
console.log(mySecondArray);
// mySecondArray.push('Pippo'); ERRORE! In un array definito come number[] possono esserci solo numeri

// Le TUPLE sono array particolari nei quali viene definito il tipo per ogni posizione, e vanno inizializzati subito
let myFirstTuple: [string, number, boolean, string] = [
	'Hello',
	1,
	true,
	'World',
];
myFirstTuple.pop();
myFirstTuple.push(15);
console.log(myFirstTuple);
// I tipi definiti in una tupla NON sono vincolanti, ma cambiando il tipo di valore presente nell'array non si rispetta più la struttura della tupla

// OGGETTI
// Funzionano esattamente come in JS, ma devono essere gestiti in base al tipo delle proprietà
const newStudent = {
	studentName: 'Mario',
	studentSurname: 'Rossi',
	studentAge: 25,
	joined: false,
};
// newStudent.joined = 'Non ancora'; ERRORE! joined è una proprietà istanziata boolean, e non può cambiare tipo

const courseType = {
	courseName: '',
	courseType: '',
	courseEdition: 0,
	courseDate: {
		startDate: '',
		endDate: '',
	},
};

// INTERFACCE
// Modelli per oggetti, sul tipo delle classi (ma non supportano metodi), estendibili esattamente come le classi, più leggere e veloci delle classi stesse. Le interfacce sono rigorose, gli oggetti costruiti sul modello delle interfacce DEVONO rispettare la struttura dell'interfaccia. È una funzionalità propria di TS, infatti non viene compilata in JS.

interface IBook {
	title: string;
	author: string;
	year: number;
	read: boolean;
	pages?: number; // Con il punto interrogativo si definisce una proprietà facoltativa
}

const arrayOfBooks: IBook[] = [
	{
		title: 'Atomic Habits',
		author: 'James Clear',
		year: 2018,
		read: false,
	},
	{
		title: 'Il nome della Rosa',
		author: 'Umberto Eco',
		year: 1980,
		read: true,
		pages: 350,
	},
	{
		title: 'Oceano Mare',
		author: 'Alessandro Baricco',
		year: 1996,
		read: true,
		pages: 200,
	},
];

console.log(arrayOfBooks);
const booksList = document.querySelector('#booksList');

arrayOfBooks.forEach((book) => {
	let read: string;
	let pagesNumber: string;
	if (book.read === true) {
		read = 'già letto';
	} else {
		read = 'da leggere';
	}
	if (book.pages) {
		pagesNumber = `numero di pagine: ${book.pages},`;
	} else {
		pagesNumber = '';
	}
	let newLi = document.createElement('li');
	newLi.textContent = `${book.title} di ${book.author}, pubblicato nel ${book.year}, ${pagesNumber} ${read}`;
	booksList!.appendChild(newLi);
});

// Esempio dell'utilizzo di un'interfaccia con una base dati
interface IComment {
	postId: number;
	name: string;
	email: string;
	body: string;
}

const myComments: IComment[] = [];
const comments = document.querySelector('#comments');

fetch('https://jsonplaceholder.typicode.com/comments')
	.then((response) => {
		if (response.ok) {
			return response.json();
		} else {
			throw new Error('Errore nella fetch');
		}
	})
	.then((data: IComment[]) => {
		for (let i = 0; i < 50; i++) {
			myComments.push({
				postId: data[i].postId,
				name: data[i].name,
				email: data[i].email,
				body: data[i].body,
			});
		}
		console.log(myComments);
		printComments();
	})
	.catch((err) => {
		console.log(err.message);
	});

const printComments = () => {
	myComments.forEach((comment) => {
		let newLi = document.createElement('li');
		newLi.setAttribute('id', String(comment.postId));
		newLi.textContent = `Commento di ${comment.name}: ${comment.body}`;
		comments!.appendChild(newLi);
	});
};

const mySum = (num1: number, num2: number, num3?: number): number => {
	let total: number;
	if (num3) {
		total = num1 + num2 + num3;
	} else {
		total = num1 + num2;
	}
	return total;
};

console.log(mySum(4, 9));
console.log(mySum(8, 2, 5));
console.log(mySum('Pippo', 3)); // ERRORE! La funzione viene eseguita comunque, ma TS segnala che il primo parametro dovrebbe essere un number

// GENERICS
// Quando il tipo di un dato (generalmente nelle interface) non è conosciuto in partenza, si usa il generic <T> per indicare che quel tipo sarà definito dall'oggetto che userà la interface

interface IEpicodeStudent<T> {
	name: string;
	surname: string;
	area: T;
}

const student1: IEpicodeStudent<string> = {
	name: 'Mario',
	surname: 'Rossi',
	area: 'Italia',
};

console.log(student1);

const student2: IEpicodeStudent<{ state: string; countryCode: number }> = {
	name: 'Dario',
	surname: 'Del Giudice',
	area: {
		state: 'Italia',
		countryCode: 80055,
	},
};

console.log(student2);

const student3: IEpicodeStudent<T> = {
	name: 'Aldo',
	surname: 'Bianchi',
	area: 25,
};

console.log(student3);
