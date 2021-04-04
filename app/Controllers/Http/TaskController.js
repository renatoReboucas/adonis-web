'use strict'

const Task = use('App/Models/Task')
class TaskController {
  async index({view}){
    const tasks = await Task.all()
    return view.render('tasks',{title: 'Your tasks', tasks: tasks.toJSON() })
  }

  async store({ request, response, session }){
    const task = new Task()

    task.title = request.input('title')
    task.body = request.input('body')

    await task.save()

    session.flash({notification: "task added!"})
    return response.redirect('/tasks')
  }
  async detail({ params, view }){
    const task = await Task.find(params.id)

    return view.render('detail', { task:task})
  }
}

module.exports = TaskController
