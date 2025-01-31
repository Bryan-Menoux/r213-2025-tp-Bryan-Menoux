/* empty css                                 */
import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as addAttribute, b as createAstro, d as renderComponent } from '../chunks/astro/server_BDFELj6O.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Base } from '../chunks/Base_CgKC1X6k.mjs';
import 'clsx';
import PocketBase from 'pocketbase';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Card = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Card;
  const offre = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<li class="bg-white shadow-md p-4 rounded-lg flex flex-col gap-2 w-full"> <h2 class="font-semibold text-xl uppercase"> ${offre.nomMaison} </h2> <p>Adresse : ${offre.adresse}</p> <p>${offre.nbChambres} chambres, ${offre.nbSdb} salles de bain</p> <p>Surface : ${offre.surface} m²</p> <p>Prix : ${offre.prix} €</p> <img class="h-80 object-cover object-center"${addAttribute(offre.imgUrl, "src")}> </li>`;
}, "C:/Users/Nekros/Documents/GitHub/r213-2025-tp-Bryan-Menoux/src/components/Card.astro", undefined);

const pb = new PocketBase("http://127.0.0.1:8090");

async function allMaisons() {
  let records = await pb.collection("maison").getFullList();
  records = records.map((maison) => {
    maison.imgUrl = pb.files.getUrl(maison, maison.images);
    return maison;
  });
  return records;
}

const $$Offres = createComponent(async ($$result, $$props, $$slots) => {
  const offres = await allMaisons();
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "titre": "Offres" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="text-teal-600 text-5xl font-black uppercase">Offres</h1>  <div class="flex flex-col gap-6" x-data="{ showFavorites: false }"> <button class="bg-teal-700 text-white shadow-md px-4 py-2 rounded-lg self-center" @click="showFavorites = !showFavorites"> <span x-show="!showFavorites">Afficher les favoris</span> <span x-show="showFavorites">Afficher tout</span> </button> <div class="grid grid-cols-3 gap-4" x-show="!showFavorites" x-transition.duration.200ms> ${offres.map((offre) => renderTemplate`${renderComponent($$result2, "Card", $$Card, { ...offre })}`)} </div> <div class="grid grid-cols-3 gap-4" x-show="showFavorites"> ${offres.map((offre) => offre.favori && renderTemplate`${renderComponent($$result2, "Card", $$Card, { ...offre })}`)} </div> </div> ` })}`;
}, "C:/Users/Nekros/Documents/GitHub/r213-2025-tp-Bryan-Menoux/src/pages/offres.astro", undefined);

const $$file = "C:/Users/Nekros/Documents/GitHub/r213-2025-tp-Bryan-Menoux/src/pages/offres.astro";
const $$url = "/offres";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Offres,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
