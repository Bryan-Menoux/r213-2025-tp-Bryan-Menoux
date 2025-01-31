/* empty css                                 */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_BDFELj6O.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Base } from '../chunks/Base_CgKC1X6k.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "titre": "Accueil" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="text-teal-800 text-5xl font-black">Accueil</h1> ` })}`;
}, "C:/Users/Nekros/Documents/GitHub/r213-2025-tp-Bryan-Menoux/src/pages/index.astro", undefined);

const $$file = "C:/Users/Nekros/Documents/GitHub/r213-2025-tp-Bryan-Menoux/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
