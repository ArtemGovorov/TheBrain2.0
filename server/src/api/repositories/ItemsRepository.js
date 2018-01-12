// @flow
import _ from 'lodash'
import moment from 'moment'

import { Collection, ObjectId } from 'mongodb'
import { MongoRepository } from './MongoRepository'

class ItemsRepository extends MongoRepository {
  itemsCollection: Collection

  init () {
    this.itemsCollection = this.db.collection('items')
  }

  async getItems (lessonPosition: number) {

  }

  async update (id: string, item: Object, userId: string) {
    return this.itemsCollection.update({_id: id, userId}, {$set: item})
  }

  async getItemById (_id: string, userId: string) {
    return this.itemsCollection.findOne({_id, userId})
  }

  async create (flashcardId: string, userId: string, courseId: string, isCasual: Boolean) {
    const newItem = {
      _id: (new ObjectId()).toString(),
      flashcardId,
      userId,
      courseId,
      actualTimesRepeated: 0,
      easinessFactor: 2.5,
      extraRepeatToday: false,
      lastRepetition: 0,
      nextRepetition: 0,
      previousDaysChange: 0,
      timesRepeated: 0,
      isCasual: !!isCasual
    }
    await this.itemsCollection.insertOne(newItem)
    return newItem
  }

  async getReviews (userId: string, isCasual: Boolean) {
    const currentDayTimestamp = moment().utc().startOf('day').unix()
    let itemsQuery = {
      userId,
      nextRepetition: { $gte: currentDayTimestamp },
    }
    if(isCasual) {
      itemsQuery = _.extend({}, itemsQuery, {isCasual: true})
    }
    const items = await this.itemsCollection.find(
      itemsQuery,
      {
        nextRepetition: 1
      }).toArray()
    const itemsByDay = _.countBy(items, (item) =>
      item.nextRepetition - item.nextRepetition % (24 * 60 * 60)
    )

    return _.map(itemsByDay, (count, ts) => ({
      ts: parseInt(ts), count
    }))
  }

  async clearNotCasualItems (userId: string) {
    return await this.itemsCollection.removeMany({userId, isCasual: false})
  }
}

export const itemsRepository = new ItemsRepository()
