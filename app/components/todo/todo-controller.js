function TodoController() {

	var todoService = new TodoService()


	function getTodos(){
		todoService.getTodos(draw)
	}

	function draw(todos) {
		var todoElem = document.getElementById('listItems')
		var todoTotal = document.getElementById('todoTotal')
		var deleteAll = document.getElementById('delete-all')
		var template = ''
		var completed = 0
		var checked = 0
	
		for (var i = 0; i < todos.length; i++) {
			
			var todo = todos[i];
			if(todo.completed == "true"){
				todo.completed = true
			}
			if(todo.completed == "false"){
				todo.completed = false
			}
			if(todo.completed){
				template+=`
				<div class="checkbox">
					<label onchange="app.controllers.todoController.toggleTodoStatus(${i})">
					<input type="checkbox" value="${i}" checked><s>${todo.todo}</s></label>
					<button class="btn btn-danger btn-xs pull-right" onclick="app.controllers.todoController.removeTodo(${i})">Delete</button>
	  			</div>
				`
				completed++
			}else{	
				template+=`
				<div class="checkbox">
				<label onchange="app.controllers.todoController.toggleTodoStatus(${i})">
				<input type="checkbox" value="${i}">${todo.todo}</label>
				</div>
				`
			}
		}
		todoTotal.innerHTML = `${completed} of ${todos.length}`
		todoElem.innerHTML = template	
		if(completed > 0){
			deleteAll.innerHTML = `<button class="btn btn-danger btn-md pull-right delete-all-btn" onclick="app.controllers.todoController.removeTodos()">Delete All</button>`
		}
		else{
			deleteAll.innerHTML = ""
		}
	}

	var formstate = false
	var showButton = document.getElementById('show-form-btn')

	this.showTodoForm = function showForm() {
		if (formstate) {
		  showButton.innerText = 'Add Something To Do'
		  showButton.className = 'btn add'
		  toDoForm.classList.add('hidden')
		  formstate = false
		} else {
		  showButton.innerText = 'Cancel'
		  showButton.className = 'btn'
		  toDoForm.classList.remove('hidden')
		  formstate = true
		}
	  }
	
	this.addTodoFromForm = function (e) {
		e.preventDefault() 
		var form = e.target
		var todo = {
			todo : form.description.value,
			completed: false
		}
		form.description.value = ""
		todoService.addTodo(todo, getTodos)
	}

	this.toggleTodoStatus = function toggleTodoStatus(i) {
		console.log(i)
		todoService.toggleTodoStatus(i, getTodos)
	}

	this.removeTodo = function removeTodo(i) {
		todoService.removeTodo(i, getTodos)
	}
	this.removeTodos = function removeTodos() {
		todoService.removeTodos(getTodos)
	}
	
	todoService.getTodos(draw)
}
