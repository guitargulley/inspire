function TodoService() {
	// A local copy of your todos
	var todoList = []
	var baseUrl = 'https://inspire-server.herokuapp.com/api/todos/brandongulley'

	function logError(err) {
		console.error('UMM SOMETHING BROKE: ', err)
	}

	this.getTodos = function getTodos(draw) {
		$.get(baseUrl)
			.then(function (res) {
				todoList = res
				draw(todoList)
			})
			.fail(logError)
	}

	this.addTodo = function addTodo(todo, cb) {
		$.post(baseUrl, todo)
			.then(function (res) {
				cb()
			})
			.fail(logError)
	}

	this.toggleTodoStatus = function toggleTodoStatus(i, cb) {
		var todo = todoList[i]
		todo.completed = !todo.completed
		$.ajax({
			method: 'PUT',
			contentType: 'application/json',
			url: baseUrl + '/' + i,
			data: JSON.stringify(todo)
		})
			.then(function (res) {
				cb()
			})
			.fail(logError)
	}
	this.removeTodo = function removeTodo(i, cb){
		$.ajax({
			method: 'DELETE',
			contentType: 'application/json',
			url: baseUrl + "/" + i 
		})
		.then(function(res){
			cb()
		})
	}
	// this.removeTodos = function removeTodos(cb){
	// 	for(var i=0; i<todoList.length; i++){
	// 		debugger
	// 		var todo = todoList[i]
	// 		if(todo.completed){
	// 			$.ajax({
	// 				method: 'DELETE',
	// 				contentType: 'application/json',
	// 				url: baseUrl +"/" + i,
	// 			})
	// 			.then(function(res){
	// 				cb()
	// 			})
				
	// 		}
	// 	}
	// }

}