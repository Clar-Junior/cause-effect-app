import people from './js/data.js';

const body = document.getElementsByTagName('body')[0]; // Obtém o elemento body, [0]
const leftPanel = document.getElementById('left_panel');
const rightPanel = document.getElementById('right_panel');

function createPersonCard(person) {
  const card = document.createElement('div');
  card.className = 'person-card';  
  card.innerHTML = `
    <h3>${person.name}</h3>
    `
  return card;
}

people.forEach(person => {
  const card = createPersonCard(person);
  leftPanel.appendChild(card);
});


function createPersonDetails(person) {
    const card = document.createElement("div");
    card.className = "person-card-details";
    card.innerHTML = `
    <h3 id="name">${person.name}</h3>
    <p id="street"><strong>Endereço:</strong> ${person.street}, ${person.city} - ${person.state}, ${person.country}</p>
    <p id="phone"><strong>Telefone:</strong> ${person.telephone}</p>
    <p id="birthday"><strong>Aniversário:</strong> ${new Date(person.birthday).toLocaleDateString()}</p>
    `;
    return card;
}

// Adiciona evento de clique para mostrar detalhes
leftPanel.addEventListener('click', (event) => {
    const card = event.target.closest('.person-card');
    if (card) {
        rightPanel.style.display = 'block';

        const name = card.querySelector('h3').textContent;
        const person = people.find(p => p.name === name);
        const details = createPersonDetails(person);
        rightPanel.innerHTML = '';
        rightPanel.appendChild(details);
        return
    }
    
    // Adiciona evento de clique para fechar detalhes
      rightPanel.style.display = 'none';

      
  });

  body.addEventListener('click', (event) => {
    // console.log(event.target);    
    const app = event.target.id === 'app';
    if (app){
      rightPanel.style.display = 'none';
      return
    }    
    
  });

  // se clique em person-card, destaca background e color do card
  leftPanel.addEventListener('click', (event) => {
    const card = event.target.closest('.person-card');
    const cards = leftPanel.querySelectorAll(".person-card");
    if (card) {
      cards.forEach((c) => c.classList.remove("selected"));
      cards.forEach(c => {
        c.style.backgroundColor = "#bfd2bf";
        c.style.color = "#080808";
      });
      console.log(cards[0].style.backgroundColor);
      
      // person-card é um HTML collection, assim marquei a variável selectedCard com o cards com 'selected'
      // marquei usando a classe selected para evitar que seja necessário
      // percorrer toda a coleção para remover o background e color do
      // card selecionado, assim basta remover a classe selected do card selecionado
      // e adicionar a classe selected ao card clicado, e no CSS definir o background e color
      // para a classe selected, assim quando clicar fora de um card,
      // basta remover a classe selected do card selecionado,
      // sem precisar percorrer toda a coleção.
        // muda background e color do card selecionado
        card.classList.add("selected");
        const selectedCard = leftPanel.querySelectorAll(".person-card.selected");
        
        if (selectedCard.length > 0) {
          selectedCard.forEach((c) => {
            c.style.backgroundColor = "#fff";
            c.style.color = "#000";
          });
        }
      }
  });