// this controller handles CRUD operations for the School model
//only for testing purposes

import School from '#models/school'
import type { HttpContext } from '@adonisjs/core/http'

export default class SchoolsController {
  //List all schools
  async index({ response }: HttpContext) {
    const schools = await School.all()
    return response.ok(schools)
  }

  // Create new school
  async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'email', 'address'])
    const school = await School.create(data)
    return response.created(school)
  }

  // Show single school
  async show({ params, response }: HttpContext) {
    const school = await School.find(params.id)
    if (!school) return response.notFound({ message: 'School not found' })
    return response.ok(school)
  }

  // Update school
  async update({ params, request, response }: HttpContext) {
    const school = await School.find(params.id)
    if (!school) return response.notFound({ message: 'School not found' })

    const data = request.only(['name', 'email', 'address', 'isActive'])
    school.merge(data)
    await school.save()

    return response.ok(school)
  }

  // Delete school
  async destroy({ params, response }: HttpContext) {
    const school = await School.find(params.id)
    if (!school) return response.notFound({ message: 'School not found' })

    await school.delete()
    return response.ok({ message: 'School deleted successfully' })
  }
}
