const dynamoose = require("dynamoose");
const { uuid } = require("uuidv4");

const Comment = dynamoose.model(
  "Comment",
  {
    id: {
      type: String,
      hashKey: true,
    },
    content: String,
    createdAt: String,
    updatedAt: String,
  },
  {
    // create db if not exists
    create: true,
  }
);

Comment.methods.set(
  "new",
  /**
   * @param {string} content
   */
  async function (content) {
    const comment = new this();
    comment.id = uuid();
    comment.content = content;

    return await comment.save();
  }
);

Comment.methods.set(
  "findAll",
  /**
   * @param {string} lastKey
   * @param {number} limit
   */
  async function (lastKey, limit = 30) {
    return await this.scan().startAt(lastKey).limit(limit).exec();
  }
);

Comment.methods.set(
  "findById",
  /**
   * @param {string} id
   */
  async function (id) {
    return (await this.query("id").eq(id).exec())[0];
  }
);

module.exports = Comment;
