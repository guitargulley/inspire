function TodoService() {
	// A local copy of your todos
	var todoList = []
	var baseUrl = "http://localhost:3000/api/"
	// 'https://inspire-server.herokuapp.com/api/todos/brandongulley'

	function logError(err) {
		console.error('UMM SOMETHING BROKE: ', err)
	}

	this.getTodos = function getTodos(draw) {
		$.get(baseUrl + "todos")
			.then(function (res) {
				console.log(res)
				todoList = res
				draw(todoList)
			})
			.fail(logError)
	}

	this.addTodo = function addTodo(todo, cb) {
		
		$.post(baseUrl + "todos" , todo)
			.then(function (res) {
				cb()
			})
			.fail(logError)
	}

	this.toggleTodoStatus = function toggleTodoStatus(i, cb) {
		debugger
		var todo = todoList[i]
		todo.completed = !todo.completed
		$.ajax({
			method: 'PUT',
			contentType: 'application/json',
			url: baseUrl + "todos" + '/' + todo._id,
			data: JSON.stringify(todo)
		})
			.then(function (res) {
				cb()
			})
			.fail(logError)
	}

	this.removeTodo = function removeTodo(i, cb) {
		var todo = todoList[i]
		$.ajax({
			method: 'DELETE',
			contentType: 'application/json',
			url: baseUrl + "todos" + '/' + todo._id,

		})
			.then(function (res) {
				cb()
			})
	}

	this.removeTodos = function removeTodos(cb){
		for(var i=0; i<todoList.length; i++){
			var todo = todoList[i]
			if(todo.completed){
				$.ajax({
					method: 'DELETE',
					contentType: 'application/json',
					url: baseUrl + "todos" + "/" + todo._id,
				})
				.then(function(res){
					cb()
				})
				
			}
		}
	}

}
