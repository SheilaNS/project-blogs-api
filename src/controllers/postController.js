const tokenValidade = require('../middlewares/tokenValidate');
const postService = require('../services/postService');

const postController = {
  add: async (req, res) => {
    const userId = await tokenValidade(req.headers.authorization);
    const data = await postService.bodyValidade(req.body);
    await postService.categoryValidade(data.categoryIds);
    const post = await postService.add(data, userId);
    res.status(201).json(post);
  },

  list: async (req, res) => {
    await tokenValidade(req.headers.authorization);
    const posts = await postService.list();
    res.status(200).json(posts);
  },
};

module.exports = postController;