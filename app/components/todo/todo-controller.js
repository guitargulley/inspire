function TodoController() {

	var todoService = new TodoService()


	function getTodos(){
		todoService.getTodos(draw)
	}

	function draw(todos) {
		var todoElem = document.getElementById('listItems')
		var todoTotal = document.getElementById('todoTotal')
		var template = ''
		var completed = 0
	
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
					<a onclick="app.controllers.todoController.removeTodo(${i})"><i class="fa fa-trash-o"></i></a>
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
	this.showForm = function showForm(){
		document.getElementById('toDoForm').classList.remove('hidden')
		document.getElementById('show-form-btn').classList.add('hidden')
	}
	this.addTodoFromForm = function (e) {
		e.preventDefault() 
		var form = e.target.toDo.value
		var todo = {
			todo : form,
			completed: false
		}

		document.getElementById('toDoForm').classList.add('hidden')
		document.getElementById('show-form-btn').classList.remove('hidden')
		showButton.innerText = 'Add Something To Do'
		showButton.className = 'btn'
		
		todoService.addTodo(todo, getTodos)
	}

	this.toggleTodoStatus = function toggleTodoStatus(i) {
		todoService.toggleTodoStatus(i, getTodos)
	}

	this.removeTodo = function removeTodo(i) {
		todoService.removeTodo(i, getTodos)
	}
	
	todoService.getTodos(draw)
}
