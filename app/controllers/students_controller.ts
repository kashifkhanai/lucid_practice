// this controller manages students and their courses
import type { HttpContext } from '@adonisjs/core/http'
import Student from '#models/student'
import Course from '#models/course'

export default class StudentsController {
  // Create student
  public async store(ctx: HttpContext) {
    try {
      const { name, email } = ctx.request.only(['name', 'email'])
      const student = await Student.create({ name, email })
      return student
    } catch (error: any) {
      return ctx.response.status(400).json({ error: error.message })
    }
  }

  // Create course
  public async createCourse(ctx: HttpContext) {
    try {
      const { title, description } = ctx.request.only(['title', 'description'])
      const course = await Course.create({ title, description })
      return course
    } catch (error: any) {
      return ctx.response.status(400).json({ error: error.message })
    }
  }

  // Attach courses to student
  public async attachCourses(ctx: HttpContext) {
    try {
      const student = await Student.findOrFail(ctx.params.id)
      const { courseIds } = ctx.request.only(['courseIds'])
      await student.related('courses').attach(courseIds)
      await student.load('courses')
      return student
    } catch (error: any) {
      return ctx.response.status(400).json({ error: error.message })
    }
  }

  // Show student with courses
  public async show(ctx: HttpContext) {
    try {
      const student = await Student.query()
        .where('id', ctx.params.id)
        .preload('courses')
        .firstOrFail()
      return student
    } catch (error) {
      return ctx.response.status(404).json({ error: 'Student not found' })
    }
  }

  // Show course with students
  public async courseStudents(ctx: HttpContext) {
    try {
      const course = await Course.query()
        .where('id', ctx.params.id)
        .preload('students')
        .firstOrFail()
      return course
    } catch (error) {
      return ctx.response.status(404).json({ error: 'Course not found' })
    }
  }
}
