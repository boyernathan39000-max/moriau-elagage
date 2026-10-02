/* =========================================================================
   moriau.js — carrousels à flèches (prestations, équipement, avis, réalisations).
   Structure : .carrousel > .carrousel__piste > .carrousel__item
               + .carrousel__commandes [data-carrousel="prec|suiv"] + .carrousel__compteur
   Sans JavaScript, la piste reste défilable au doigt.
   ========================================================================= */
(function () {
  'use strict';

  document.querySelectorAll('.carrousel').forEach(function (bloc) {
    var piste = bloc.querySelector('.carrousel__piste');
    var items = piste.querySelectorAll('.carrousel__item');
    var prec = bloc.querySelector('[data-carrousel="prec"]');
    var suiv = bloc.querySelector('[data-carrousel="suiv"]');
    var compteur = bloc.querySelector('.carrousel__compteur');
    if (!items.length) return;

    var pas = function () {
      var ecart = parseFloat(getComputedStyle(piste).columnGap) || 0;
      return items[0].getBoundingClientRect().width + ecart;
    };

    var maj = function () {
      var max = piste.scrollWidth - piste.clientWidth - 2;
      if (prec) prec.disabled = piste.scrollLeft <= 2;
      if (suiv) suiv.disabled = piste.scrollLeft >= max;
      var commandes = bloc.querySelector('.carrousel__commandes');
      if (commandes) commandes.hidden = max <= 0;
      if (compteur) {
        var i = Math.round(piste.scrollLeft / pas()) + 1;
        var visibles = Math.max(1, Math.round(piste.clientWidth / pas()));
        compteur.textContent = Math.min(i, items.length - visibles + 1) + ' / ' + (items.length - visibles + 1);
      }
    };

    if (prec) prec.addEventListener('click', function () { piste.scrollBy({ left: -pas(), behavior: 'smooth' }); });
    if (suiv) suiv.addEventListener('click', function () { piste.scrollBy({ left: pas(), behavior: 'smooth' }); });
    piste.addEventListener('scroll', function () { window.requestAnimationFrame(maj); }, { passive: true });
    window.addEventListener('resize', maj, { passive: true });
    window.addEventListener('load', maj);
    maj();
  });
})();
