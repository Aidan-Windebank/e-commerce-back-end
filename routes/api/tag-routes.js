const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// get route for all tags
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: {model:Product, through: ProductTag}
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get route for tag by id
router.get('/:id', async (req, res) => {
  try {
    const tags = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if (!tags) {
      res.status(404).json({ message: 'No tag found!' });
      return;
    }

    res.status(200).json(tags);
    } catch (err) {
    res.status(500).json(err);
  }
});

  // create a new tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

  // update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!updateTag[0]) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }

    res.status(200).json(updateTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteTag) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }

    res.status(200).json(deleteTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;