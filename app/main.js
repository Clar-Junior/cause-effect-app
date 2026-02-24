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
    const app = event.target.id === 'app';
    if (app) {
        // 1. Remove a classe de todos
        const allCards = leftPanel.querySelectorAll(".person-card");
        allCards.forEach((c) => c.classList.remove("selected"));

        rightPanel.style.display = "none";
        return;
    }    
  });

  // se clique em person-card, destaca background e color do card
  leftPanel.addEventListener("click", (event) => {
      const card = event.target.closest(".person-card");

      if (card) {
          // 1. Remove a classe de todos
          const allCards = leftPanel.querySelectorAll(".person-card");
          allCards.forEach((c) => c.classList.remove("selected"));

          // 2. Adiciona apenas no clicado
          card.classList.add("selected");

          // O CSS agora fará o resto, através da classe "selected" e de !important
      } else {
          // Se clicar no painel mas fora de um card, remove a seleção
          const allCards = leftPanel.querySelectorAll(".person-card");
          allCards.forEach((c) => c.classList.remove("selected"));
      }
  });