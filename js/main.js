var cells = document.querySelectorAll('.cell');
var msgVictoire = document.querySelector('.msg');
var ctaRejouer = document.querySelector('.rejouer');
var TourDuJ1 = true;
var partieGagnee = false;
var afficherSymbole = function(cell) {
	if (cell.textContent === '' && !partieGagnee) { // verifier case remplie
		if (TourDuJ1) {
			cell.classList.add('rond'); // poser symbole J1 et J2
		} else {
			cell.classList.add('croix');
		}
		TourDuJ1 = !TourDuJ1; // changer joueur courant
	} else {
		return; // arrete la fonction
	}
};

var combinaisonsGagnantes = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

var verifierCombinaisons = function() {
	combinaisonsGagnantes.forEach(function(combinaison) {
		if (
			cells[combinaison[0]].classList[1] === cells[combinaison[1]].classList[1] &&
			cells[combinaison[1]].classList[1] === cells[combinaison[2]].classList[1] &&
			(cells[combinaison[0]].classList[1] === 'rond' ||
				cells[combinaison[0]].classList[1] === 'croix')
		) {
			// console.log('Gagné');
			partieGagnee = true;
			msgVictoire.classList.remove('msg');
			ctaRejouer.addEventListener('click', function() {
				location.reload();
			});
		}
	});
};

// forEach : pour chaque élement du tableau

// on ajoute un addEventListener à chaque élement/cell du tableau
cells.forEach(function(cell) {
	cell.addEventListener('click', function() {
		if (!partieGagnee) {
			afficherSymbole(cell);
			verifierCombinaisons();
		}
	});
});