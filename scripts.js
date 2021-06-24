function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.append(el);
}

const section = document.getElementById("pokemons");
const url = "https://api.pokemontcg.io/v2/cards?q=nationalPokedexNumbers:[1 TO 151] subtypes:Basic";

fetch(url, {
  method: "GET",
  headers: {
    "X-Api-Key": "80dd4ec6-8790-4c81-868f-f2e2f0e72b12"
  }
})
  .then((resp) => resp.json())
  .then((data) => {
    let pokemons = data.data;
    let newPokemons = pokemons.sort(() => 0.5 - Math.random()).slice(0, 10);
    return newPokemons.map(function (poke) {
      let div = createNode("div");
      let frontside = createNode("img");
      let backside = createNode("img");
      
      div.className = "pokemon__card";
      div.addEventListener('click', (event) => {

        const target = event.target.parentElement;
        //console.log(target);
        target.classList.add('flip');

      });

      frontside.src = "img/Pokemon-Card.jpg";
      frontside.className = "front__side";
      frontside.alt = poke.supertype;

      backside.src = poke.images.small;
      backside.className = "back__side";
      backside.alt = poke.name;

      append(section, div);
      append(div, frontside);
      append(div, backside);
    });
  })
  .catch(function (error) {
    console.log(error);
  });