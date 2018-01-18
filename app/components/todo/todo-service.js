function TodoService() {
	
	// A local copy of your todos
	var todoList = []

	var baseUrl ="https://gulley-inspire.herokuapp.com/api/"

	function logError(err) {
		console.error('UMM SOMETHING BROKE: ', err)
	}

	this.getTodos = function getTodos(draw) {
		axios.get(baseUrl + "todos")
			.then(function (res) {
				console.log(res)
				todoList = res.data
				draw(todoList)
			})
			.fail(logError)
	}

	this.addTodo = function addTodo(todo, cb) {
		
		axios.post(baseUrl + "todos" , todo)
			.then(function (res) {
				cb()
			})
			.fail(logError)
	}

	this.toggleTodoStatus = function toggleTodoStatus(i, cb) {
		debugger
		var todo = todoList[i]
		todo.completed = !todo.completed
		axios({
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
		axios({
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
				axios({
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
