function TodoService() {
	let api = axios.create({
		baseURL: baseUrl+'/api/',
		timeout: 2000,
		withCredentials: true
	  })
	// A local copy of your todos
	var todoList = []

	var baseUrl ="https://gulley-inspire.herokuapp.com"

	function logError(err) {
		console.error('UMM SOMETHING BROKE: ', err)
	}

	this.getTodos = function getTodos(draw) {
		api("todos")
			.then(function (res) {
				console.log(res)
				todoList = res.data
				draw(todoList)
			})
			.fail(logError)
	}

	this.addTodo = function addTodo(todo, cb) {
		
		api.post("todos" , todo)
			.then(function (res) {
				cb()
			})
			.fail(logError)
	}

	this.toggleTodoStatus = function toggleTodoStatus(i, cb) {
		debugger
		var todo = todoList[i]
		todo.completed = !todo.completed
		api.put("todos/" + todo._id, todo)
			.then(function (res) {
				cb()
			})
			.fail(logError)
	}

	this.removeTodo = function removeTodo(i, cb) {
		var todo = todoList[i]
		api.delete("todos" + '/' + todo._id)
			.then(function (res) {
				cb()
			})
	}

	this.removeTodos = function removeTodos(cb){
		for(var i=0; i<todoList.length; i++){
			var todo = todoList[i]
			if(todo.completed){
				api.delete("todos/" + todo._id)
				.then(function(res){
					cb()
				})
				
			}
		}
	}

}
