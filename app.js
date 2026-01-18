let areaAtual = 0;

function mostrar(sec){
  document.getElementById("calc").style.display = "none";
  document.getElementById("hist").style.display = "none";
  document.getElementById(sec).style.display = "block";
  if(sec === "hist") carregar();
}

function calcular(){
  const l = Number(largura.value);
  const c = Number(comprimento.value);
  if(!l || !c) return alert("Informe as medidas");
  areaAtual = l * c;
  total.innerText = areaAtual.toFixed(2);
}

function salvar(){
  const proj = projeto.value.trim();
  const com = comodo.value.trim();
  if(!proj || !com || !areaAtual) return alert("Dados incompletos");

  let dados = JSON.parse(localStorage.getItem("squarem")) || {};

  if(!dados[proj]) dados[proj] = [];

  dados[proj].push({
    id: Date.now(),
    comodo: com,
    area: areaAtual,
    data: new Date().toLocaleString()
  });

  localStorage.setItem("squarem", JSON.stringify(dados));

  comodo.value = "";
  largura.value = "";
  comprimento.value = "";
  areaAtual = 0;
  total.innerText = "0";

  alert("Cômodo salvo no projeto");
}

function carregar(){
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  const dados = JSON.parse(localStorage.getItem("squarem")) || {};

  Object.keys(dados).forEach(proj => {
    let soma = 0;

    const li = document.createElement("li");
    li.innerHTML = `<strong>${proj}</strong><ul></ul>`;
    const ul = li.querySelector("ul");

    dados[proj].forEach(c => {
      soma += c.area;
      const item = document.createElement("li");
      item.innerHTML = `
        ${c.comodo}: ${c.area.toFixed(2)} m²
        <button onclick="excluir('${proj}', ${c.id})">❌</button>
      `;
      ul.appendChild(item);
    });

    const total = document.createElement("div");
    total.innerHTML = `<b>Total:</b> ${soma.toFixed(2)} m²`;
    li.appendChild(total);

    lista.appendChild(li);
  });
}

function excluir(proj, id){
  let dados = JSON.parse(localStorage.getItem("squarem"));
  dados[proj] = dados[proj].filter(c => c.id !== id);
  if(dados[proj].length === 0) delete dados[proj];
  localStorage.setItem("squarem", JSON.stringify(dados));
  carregar();
    }
