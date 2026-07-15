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
