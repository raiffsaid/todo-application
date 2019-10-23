var listElement = document.querySelector("#app ul");
var inputElement = document.querySelector("#app input");
var buttonElement = document.querySelector("#app button");

//Transforma os itens da variável localStorage de volta em um array
//Caso não tenha nenhum valor no array, define um array vazio
var todos = JSON.parse(localStorage.getItem("list_todos")) || [];

function renderTodos() {
  listElement.innerHTML = "";
  
  //for of - específico para arrays
  //Percorre todos os itens do array todos e retorna para todo
  for (todo of todos) {
    var todoElement = document.createElement("li");
    var todoText = document.createTextNode(todo + " ");

    var linkElement = document.createElement("a");

    linkElement.setAttribute("href", "#");

    //Salva na variável var, a posição de acordo com o índice do array
    //naquela determinada iteração
    var position = todos.indexOf(todo);
    //Ao clicar o botão, deleta o elemento na posição 
    linkElement.setAttribute("onclick", `deleteTodo(${position})`);

    var linkText = document.createTextNode("Delete");

    linkElement.appendChild(linkText);

    todoElement.appendChild(todoText);
    todoElement.appendChild(linkElement);

    listElement.appendChild(todoElement);
  }
}

renderTodos();

function addTodo() {
  //Recuperar o valor do input
  var todoText = inputElement.value;
  if (todoText) {
    //Adiciona ao final do array o valor de todoText
    todos.push(todoText);
    //Apaga o valor no campo do input
    inputElement.value = "";
    renderTodos();
    saveToStorage();
  } else {
    alert("Type a TODO");
  }
}
//Ao clicar no botão, roda a função addTodo()
buttonElement.onclick = addTodo;

function deleteTodo(position) {
  todos.splice(position, 1);
  renderTodos();
  saveToStorage()
}

function saveToStorage() {
  //Faz a conversão para o formato JSON do array todos
  //E seta com o valor list_todos na variável localStorage 
  localStorage.setItem("list_todos", JSON.stringify(todos))
}