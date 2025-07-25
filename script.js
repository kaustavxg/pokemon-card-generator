let input = document.querySelector('#pokemon-id');
let selected = document.querySelector('#pokemon-type')
let submitBtn = document.querySelector('#submit');

let container = document.createElement('div');
container.className = "card-box"

submitBtn.addEventListener('click', function(){
    console.log("starting of get pokemon");

    let count = parseInt(input.value);
    let type = selected.value;

    console.log("Input Count:", count);
    console.log("Selected Type:", type);


    container.innerHTML = "<h3>Loading....</h3>"

    getPokemon(count, type);
})

function getPokemon(count, type){
    container.innerHTML = "";
    let displayed = 0;

    for(let id = 1; id <=200; id++){
        if(displayed >= count) return;
        console.log("fetched id is", id);
        

        fetch("https://pokeapi.co/api/v2/pokemon/" + id)
            .then(function(response){
                console.log(`Response of ID: ${id} ${response}`);
                return response.json();
            })
            .then(function(data){
                for(let i = 0; i < data.types.length; i++){
                    console.log(`Pokemon types ${data.types}`);
                    
                    if(data.types[i].type.name === type){
                        if(displayed < count){
                            showPokemon(data);                    
                            displayed++;
                        }
                        break;
                    }
                }
            })
    }
}

function showPokemon(pokemon){
    // console.log(`Showing pokemon ${pokemon.name}`);
    let card = document.createElement("div");
    card.style.border = "1px solid black";
    card.style.padding = "10px";
    card.style.margin = "10px";
    card.style.display = "inline-block";
    
    // display name
    let name = document.createElement("h3");
    name.innerText = pokemon.name;

    // display image
    let image = document.createElement("img");
    image.src = pokemon.sprites.front_default;
    image.style.height = "100px";
    image.style.width = "100px";

    // display ID
    let id = document.createElement("span");
    id.innerText = `Pokemon ID: ${pokemon.id}`

    // display height
    let height = document.createElement("p");
    height.innerText = `Height: ${pokemon.height}`
    
    // display weight
    let weight = document.createElement("p");
    weight.innerText = `Weight: ${pokemon.weight}`

    // display stats
    let hp = document.createElement("span");
    hp.innerText = `HP: ${pokemon.stats.find(stat => stat.stat.name === 'hp').base_stat}`;

    // display abilities
    let abilities = document.createElement("span");
    abilities.innerText = `Abilities: ${pokemon.abilities.map(ability => ability.ability.name)}`;

    card.appendChild(name);
    card.appendChild(image);
    card.appendChild(id)
    card.appendChild(height);
    card.appendChild(weight)
    card.appendChild(hp);
    card.appendChild(abilities);
    container.appendChild(card);
}

document.body.appendChild(container);