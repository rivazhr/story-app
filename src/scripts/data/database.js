import { openDB } from 'idb';
import { getCurrentUser } from '../utils/auth';

const DATABASE_NAME = 'lulutalk';
const DATABASE_VERSION = 2;
const OBJECT_STORE_NAME = 'saved-stories';

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade: (database) => {
    if (database.objectStoreNames.contains(OBJECT_STORE_NAME)) {
      database.deleteObjectStore(OBJECT_STORE_NAME);
    }
    database.createObjectStore(OBJECT_STORE_NAME, {
      keyPath: 'key',
    });
  },
});

const Database = {
  async putStory(story) {
    if (!Object.hasOwn(story, 'id')) {
      throw new Error('`id` is required to save.');
    }
    const userId = getCurrentUser();
    const storyWithKey = {
      ...story,
      userId,
      key: `${userId}-${story.id}`,
    };
    return (await dbPromise).put(OBJECT_STORE_NAME, storyWithKey);
  },
  async getStoryById(id) {
    if (!id) {
      throw new Error('`id` is required.');
    }
    const userId = getCurrentUser();
    const key = `${userId}-${id}`;
    return (await dbPromise).get(OBJECT_STORE_NAME, key);
  },
  async getAllStories() {
    const userId = getCurrentUser();
    const stories = await (await dbPromise).getAll(OBJECT_STORE_NAME);
    return stories.filter((story) => story.userId === userId);
  },
  async removeStory(id) {
    const userId = getCurrentUser();
    const key = `${userId}-${id}`;
    return (await dbPromise).delete(OBJECT_STORE_NAME, key);
  },
};
export default Database;