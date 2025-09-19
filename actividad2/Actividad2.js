const BASE_URL = "https://jsonplaceholder.typicode.com";

async function getUsers() {
  let res = await fetch(`${BASE_URL}/users`);
  let data = await res.json();
  return data.slice(0, 3);
}

async function getPosts(id) {
  let res = await fetch(`${BASE_URL}/posts?userId=${id}`);
  return res.json();
}

//Secuencial
async function runSequential() {
  console.time("Secuencial");
  console.log("Secuencial");

  const usersData = await getUsers();

  for (let u of usersData) {
    const posts = await getPosts(u.id);
    console.log(`${u.name} tiene ${posts.length} publicaciones`);
  }

  console.timeEnd("Secuencial");
}

// --- Paralelo ---
async function runParallel() {
  console.time("Concurrente");
  console.log("Concurrente");

  const usersData = await getUsers();

  const promises = usersData.map(u => getPosts(u.id));

  const results = await Promise.all(promises);

  usersData.forEach((u, i) => {
    console.log(`${u.name} tiene ${results[i].length} publicaciones`);
  });

  console.timeEnd("Concurrente");
}



(async () => {
  await runSequential();
  await runParallel();
})();
