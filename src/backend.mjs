import PocketBase from "pocketbase";
const pb = new PocketBase("http://127.0.0.1:8090");

export async function allMaisons() {
  let records = await pb.collection("maison").getFullList();
  records = records.map((maison) => {
    maison.imgUrl = pb.files.getUrl(maison, maison.images);
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
  const record = await pb
    .collection("maison")
    .getFullList({ filter: `surface >= ${surface}` });
  return record;
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
    let data = await pb.collection("maison").getOne(id);
    data.imageUrl = pb.files.getURL(data, data.image);
    return data;
  } catch (error) {
    console.log("Une erreur est survenue en lisant la maison", error);
    return null;
  }
}