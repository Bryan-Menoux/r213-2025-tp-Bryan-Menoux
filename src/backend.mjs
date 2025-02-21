import PocketBase from "pocketbase";
const pb = new PocketBase("http://127.0.0.1:8090");

export async function superUserauth() {
  const authData = await pb
    .collection("_superusers")
    .authWithPassword("admin@admin.com", "RU_D0f52Zwl4s2m");
  return authData;
}

export async function allMaisons() {
  await superUserauth();
  let records = await pb.collection("maison").getFullList();
  records = records.map((maison) => {
    maison.imgUrl = pb.files.getURL(maison, maison.images);
    return maison;
  });
  return records;
}

export async function allMaisonsByAgentId(agentId) {
  await superUserauth();
  let records = await pb.collection("maison").getFullList({
    filter: `agent.id = '${agentId}'`,
  });
  records = records.map((maison) => {
    maison.imgUrl = pb.files.getURL(maison, maison.images);
    return maison;
  });
  return records;
}

export async function getAllAgents() {
  await superUserauth();
  return pb.collection("agent").getFullList();
}

export async function oneID(id) {
  await superUserauth();
  const record = await pb.collection("maison").getOne(id);
  return record;
}

export async function allMaisonsFavori() {
  await superUserauth();
  const record = await pb
    .collection("maison")
    .getFullList({ filter: "favori = true" });
  return record;
}

export async function allMaisonsSorted() {
  await superUserauth();
  const record = await pb.collection("maison").getFullList({ sort: "prix" });
  return record;
}

export async function bySurface(surface) {
  await superUserauth();
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
  await superUserauth();
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
  await superUserauth();
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
  await superUserauth();
  const record = await pb.collection("maison").getFullList({
    filter: `surface >= ${surface} || prix <= ${price}`,
  });
  return record;
}

export async function donneesAgent(id) {
  await superUserauth();
  const record = await pb.collection("agent").getOne(id);
  return record;
}

export async function fourchette(min, max) {
  await superUserauth();
  // Fonction ajoutée pour trier les maisons ayant pour prix un intervalle donné.
  // Les données sont triées par ordre croissant de prix.
  const record = await pb
    .collection("maison")
    .getFullList({ sort: "prix", filter: `prix >= ${min} && prix <= ${max}` });
  return record;
}

export async function getOffre(id) {
  await superUserauth();
  try {
    let maison = await pb.collection("maison").getOne(id);
    maison.imgUrl = pb.files.getURL(maison, maison.images);
    return maison;
  } catch (error) {
    console.log("Une erreur est survenue en lisant la maison", error);
    return null;
  }
}

export async function addNewMaison(newMaison) {
  await superUserauth();
  await pb.collection("maison").create(newMaison);
}

export async function newAgent(newAgent) {
  await superUserauth();
  await pb.collection("agent").create(newAgent);
}

export async function deleteMaisonById(id) {
  await superUserauth();
  await pb.collection("maison").delete(id);
}

export async function deleteAgentById(id) {
  await superUserauth();
  await pb.collection("agent").delete(id);
}

export async function updateMaisonById(id, data) {
  await superUserauth();
  await pb.collection("maison").update(id, data);
}

export async function updateAgentById(id, data) {
  await superUserauth();
  await pb.collection("agent").update(id, data);
}

// TP 6

export async function addNewUser(user) {
  await superUserauth();
  await pb.collection("users").create(user);
  pb.authStore.clear();
}

export async function userAuth(login, mdp) {
  await superUserauth();
  const authData = await pb.collection("users").authWithPassword(login, mdp);
  pb.authStore.clear();
  return authData;
}

export async function addOffre(house) {
  await superUserauth();
  try {
    await pb.collection("maison").create(house);
    pb.authStore.clear();
    return {
      success: true,
      message: "Offre ajoutée avec succès",
    };
  } catch (error) {
    console.log("Une erreur est survenue en ajoutant la maison", error);
    pb.authStore.clear();
    return {
      success: false,
      message: "Une erreur est survenue en ajoutant la maison",
    };
  }
}

export async function filterByPrix(prixMin, prixMax) {
  await superUserauth();
  try {
    let data = await pb.collection("maison").getFullList({
      sort: "-date_de_creation",
      filter: `prix >= ${prixMin} && prix <= ${prixMax}`,
    });
    data = data.map((maison) => {
      maison.imgUrl = pb.files.getURL(maison, maison.images);
      return maison;
    });
    return data;
  } catch (error) {
    console.log(
      "Une erreur est survenue en filtrant la liste des maisons",
      error
    );
    return [];
  }
}
