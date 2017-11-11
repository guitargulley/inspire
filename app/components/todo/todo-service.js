function TodoService() {
	// A local copy of your todos
	var todoList = []
	var baseUrl = 'https://inspire-server.herokuapp.com/api/todos/brandongulley'

	function logError(err) {
		console.error('UMM SOMETHING BROKE: ', err)
		//CAN YOU NOTIFY THE USER IF SOMETHING BREAKS? 
		//do this without breaking the controller/service responsibilities
	}

	this.getTodos = function getTodos(draw) {
		$.get(baseUrl)
			.then(function (res) { // <-- WHY IS THIS IMPORTANT????
				todoList = res
				draw(todoList)
			})
			.fail(logError)
	}

	this.addTodo = function addTodo(todo, cb) {
		// WHAT IS THIS FOR???
		$.post(baseUrl, todo)
			.then(function(res){ 
				// <-- WHAT DO YOU DO AFTER CREATING A NEW TODO?
				cb()

			}) 
			.fail(logError)
	}

	this.toggleTodoStatus = function toggleTodoStatus(i, cb) {
		// MAKE SURE WE THINK THIS ONE THROUGH
		//STEP 1: Find the todo by its index **HINT** todoList
		var todo = todoList[i]
		//STEP 2: Change the completed flag to the opposite of what is is **HINT** todo.completed = !todo.completed
		todo.completed = !todo.completed
		//STEP 3: Here is that weird Ajax request because $.put doesn't exist
		console.log(todo)
		$.ajax({
			method: 'PUT',
			contentType: 'application/json',
			url: baseUrl + '/' + i,
			data: JSON.stringify(todo)
		})
			.then(function (res) {
				//DO YOU WANT TO DO ANYTHING WITH THIS?
				cb()
			})
			.fail(logError)
	}

	this.removeTodo = function removeTodo(i, cb) {
		// Umm this one is on you to write.... It's also unique, like the ajax call above. The method is a DELETE
		$.ajax({
			method: 'DELETE',
			contentType: 'application/json',
			url: baseUrl + '/' + i,
			
		})
			.then(function (res) {
				//DO YOU WANT TO DO ANYTHING WITH THIS?
				cb()
			})
	}

}