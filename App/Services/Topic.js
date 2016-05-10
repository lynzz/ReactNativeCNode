'use strict';

import { EventEmitter } from 'events'

import {fetchData} from './Util';

const store = new EventEmitter()

store.topicsList = (params) => {
  return fetchData('topics', params)
}

store.getTopic = (id, params) => {
  console.log(id);
  return fetchData(`topic/${id}`, params)
}

export default store
