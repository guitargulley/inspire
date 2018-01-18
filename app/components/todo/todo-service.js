function TodoService() {
	// A local copy of your todos
	var todoList = []
	// var url = '//bcw-getter.herokuapp.com/?url=';
	// var url2 = "https://bg-inspire.herokuapp.com/api/"
	// var baseUrl = url + encodeURIComponent(url2);
	// 
	// 'https://inspire-server.herokuapp.com/api/todos/brandongulley'
	var baseUrl ="https://gulley-inspire.herokuapp.com/api"

	function logError(err) {
		console.error('UMM SOMETHING BROKE: ', err)
	}

	this.getTodos = function getTodos(draw) {
		debugger
		$.get(baseUrl + "todos")
			.then(function (res) {
				debugger
				console.log(res)
				todoList = res.data
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
			url: baseUrl + "todos/" + todo._id,
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
