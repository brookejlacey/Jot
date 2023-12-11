import { EventEmitter } from './utils/EventEmitter.js'
import { createObservableProxy } from './utils/ObservableProxy.js'
import { Note } from './models/Jot.js'

class ObservableAppState extends EventEmitter {
  /**@type {import('./models/Example.js').Example[]} */
  examples = []


  notes = [
    new Note({
      title: 'Help Me',
      body: 'Help I am freaking out',
      color: '#ffeb3b',
      updatedAt: '12/7/2023',
      createdAt: '${this.date}'
    }),
    new Note({
      title: 'Sample Note 2',
      body: 'This is the second sample note',
      color: '#f44336',
      updatedAt: '12/7/2023',
      createdAt: 'todays date'
    }),
  ];
  /** @type {Note} */
  activeNote = null
}


export const AppState = createObservableProxy(new ObservableAppState())