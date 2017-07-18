// @flow
import { Collection, ObjectId } from 'mongodb'
import { MongoRepository } from './MongoRepository'

class CoursesRepository extends MongoRepository {
  coursesCollection: Collection

  init () {
    this.coursesCollection = this.db.collection('courses')
  }

  async getCourses () {
    return this.coursesCollection.find().toArray()
  }

  async getCourse (_id: string) {
    return this.coursesCollection.findOne({_id: new ObjectId(_id)})
  }
}

export const coursesRepository = new CoursesRepository()