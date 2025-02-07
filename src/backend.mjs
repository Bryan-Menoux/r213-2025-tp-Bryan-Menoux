import PocketBase from "pocketbase";
const pb = new PocketBase("http://127.0.0.1:8090");

export async function allMaisons() {
  let records = await pb.collection("maison").getFullList();
  records = records.map((maison) => {
    maison.imgUrl = pb.files.getURL(maison, maison.images);
    return maison;
  });
  return records;
}

export async function oneID(id) {
  const record = await pb.collection("maison").getOne(id);
  return record;
}

export async function allMaisonsFavori() {
  const record = await pb
    .collection("maison")
    .getFullList({ filter: "favori = true" });
  return record;
}

export async function allMaisonsSorted() {
  const record = await pb.collection("maison").getFullList({ sort: "prix" });
  return record;
}

export async function bySurface(surface) {
  let records = await pb
    .collection("maison")
    .getFullList({ filter: `surface >= ${surface}` });
  records = records.map((maison) => {
    maison.imgUrl = pb.files.getURL(maison, maison.images);
    return maison;
  });
  return records;
}

export async function byPrice(prix) {
  let records = await pb
    .collection("maison")
    .getFullList({ filter: `prix <= ${prix}` });
  records = records.map((maison) => {
    maison.imgUrl = pb.files.getURL(maison, maison.images);
    return maison;
  });
  return records;
}

export async function priceBetween(prixMin, prixMax) {
  let records = await pb.collection("maison").getFullList({
    filter: `prix >= ${prixMin} && prix <= ${prixMax}`,
  });
  records = records.map((maison) => {
    maison.imgUrl = pb.files.getURL(maison, maison.images);
    return maison;
  });
  return records;
}

export async function surfaceORprice(surface, price) {
  const record = await pb.collection("maison").getFullList({
    filter: `surface >= ${surface} || prix <= ${price}`,
  });
  return record;
}

export async function donneesAgent(id) {
  const record = await pb.collection("agent").getOne(id);
  return record;
}

export async function fourchette(min, max) {
  //  fonction ajoutée pour trier les maison ayant pour prix un intervalle donné. Les données sont triés par ordre croissant de prix
  const record = await pb
    .collection("maison")
    .getFullList({ sort: "prix", filter: `prix >= ${min} && prix <= ${max}` });
  return record;
}

export async function getOffre(id) {
  try {
    let maison = await pb.collection("maison").getOne(id);
    maison.imgUrl = pb.files.getURL(maison, maison.images);
    return maison;
  } catch (error) {
    console.log("Une erreur est survenue en lisant la maison", error);
    return null;
  }
}
