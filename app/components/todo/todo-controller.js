function TodoController() {
	// new up the TodoService that has already been configured for your use
	// You will need four methods
	// getTodos should request your api/todos and give an array of todos to your callback fn
	// addTodo takes in a todo and posts it to the server
	// toggleTodoStatus takes in a todo marks its status as completed and puts it to the server
	// removeTodo takes in a todoId and sends a delete request to the server
	// **** HINT: Everytime you make a change to any todo don't forget to get the todo list again
	var todoService = new TodoService()

	// Use this getTodos function as your callback for all other edits
	function getTodos(){
		//FYI DONT EDIT ME :)
		todoService.getTodos(draw)
	}

	function draw(todos) {
		//WHAT IS MY PURPOSE?
		//BUILD YOUR TODO TEMPLATE HERE
		var todoElem = document.getElementById('listItems')
		var template = ''
		//DONT FORGET TO LOOP
		for (var i = 0; i < todos.length; i++) {
			var todo = todos[i];
			if(!todo.completed){
				template+=`
				<div class="checkbox">
					<label onclick="app.controllers.todoController.toggleTodoStatus(${i})">
					<input type="checkbox" value="${i}" >${todo.todo}</label>
					<a onchange="app.controllers.todoController.removeTodo(${i})"><i class="fa fa-trash-o" aria-hidden="true"></i></a>
	  			</div>
				`
			}else{	
				template+=`
				<div class="checkbox">
				<label onchange="app.controllers.todoController.toggleTodoStatus(${i})"><input type="checkbox" value="${i}" >${todo.todo}</label>
				</div>
				`
			}
		}
		todoElem.innerHTML = template

		
	}
	var formstate = false
	var showButton = document.getElementById('show-form-btn')
	this.showTodoForm = function showForm() {
		if (formstate) {
		  showButton.innerText = 'Add Something To Do'
		  showButton.className = 'btn btn-info'
		  toDoForm.classList.add('hidden')
		  formstate = false
		} else {
		  showButton.innerText = 'Cancel'
		  showButton.className = 'btn btn-danger'
		  toDoForm.classList.remove('hidden')
		  formstate = true
		}
	  }
	this.showForm = function showForm(){
		document.getElementById('toDoForm').classList.remove('hidden')
		document.getElementById('show-form-btn').classList.add('hidden')
	}
	this.addTodoFromForm = function (e) {
		e.preventDefault() // <-- hey this time its a freebie don't forget this
		// TAKE THE INFORMATION FORM THE FORM
		var form = e.target.toDo.value
		var todo = {
			todo : form,
			completed: false
			// DONT FORGET TO BUILD YOUR TODO OBJECT
		}
		document.getElementById('toDoForm').classList.add('hidden')
		document.getElementById('show-form-btn').classList.remove('hidden')

		//PASSES THE NEW TODO TO YOUR SERVICE
		//DON'T FORGET TO REDRAW THE SCREEN WITH THE NEW TODO
		//YOU SHOULDN'T NEED TO CHANGE THIS
		todoService.addTodo(todo, getTodos)
		                         //^^^^^^^ EXAMPLE OF HOW TO GET YOUR TOODOS AFTER AN EDIT
	}

	this.toggleTodoStatus = function toggleTodoStatus(i) {
		// asks the service to edit the todo status
		todoService.toggleTodoStatus(i, getTodos)
		// YEP THATS IT FOR ME
	}

	this.removeTodo = function removeTodo(todo) {
		// ask the service to run the remove todo with this id
		todoService.removeTodo(todo, getTodos)
		// ^^^^ THIS LINE OF CODE PROBABLY LOOKS VERY SIMILAR TO THE toggleTodoStatus
	}
	todoService.getTodos(draw)
	// IF YOU WANT YOUR TODO LIST TO DRAW WHEN THE PAGE FIRST LOADS WHAT SHOULD YOU CALL HERE???

}
