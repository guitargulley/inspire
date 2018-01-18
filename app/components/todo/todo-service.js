function TodoService() {
	var baseUrl ="https://gulley-inspire.herokuapp.com"
	let api = function (){axios.create({
		baseURL: baseUrl+'/api/',
		timeout: 2000,
		withCredentials: true
	  })}
	// A local copy of your todos
	var todoList = []


	function logError(err) {
		console.error('UMM SOMETHING BROKE: ', err)
	}

	this.getTodos = function getTodos(draw) {
		var self=this
		self.api("todos")
			.then(function (res) {
				console.log(res)
				todoList = res.data
				draw(todoList)
			})
			.fail(logError)
	}

	this.addTodo = function addTodo(todo, cb) {
		var self=this
		self.api.post("todos" , todo)
			.then(function (res) {
				cb()
			})
			.fail(logError)
	}

	this.toggleTodoStatus = function toggleTodoStatus(i, cb) {
		var self=this
		var todo = todoList[i]
		todo.completed = !todo.completed
		self.api.put("todos/" + todo._id, todo)
			.then(function (res) {
				cb()
			})
			.fail(logError)
	}

	this.removeTodo = function removeTodo(i, cb) {
		var self=this
		var todo = todoList[i]
		self.api.delete("todos" + '/' + todo._id)
			.then(function (res) {
				cb()
			})
	}

	this.removeTodos = function removeTodos(cb){
		var self=this
		for(var i=0; i<todoList.length; i++){
			var todo = todoList[i]
			if(todo.completed){
				self.api.delete("todos/" + todo._id)
				.then(function(res){
					cb()
				})
				
			}
		}
	}

}
