const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

function findTagById(id) {
  return Tag.findByPk(id, {
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      },
    ],
  });
}

router.get('/', (req, res) => {
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      },
    ],
  }).then((tags) => {
    res.json(tags);
  }).catch((err) => {
    res.send(err);
  });
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  findTagById(req.params.id).then((tags) => {
    res.json(tags);
  }).catch((err) => {
    res.send(err);
  });
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  Tag.create(req.body).then(() => {
    res.sendStatus(200);
  }).catch((err) => {
    res.send(err);
  });
  
  // create a new tag
});

router.put('/:id', (req, res) => {
  findTagById(req.body.id).then((targetTag) => {
    targetTag.update(req.body)
    .then(() => {
      targetTag.save();
      res.sendStatus(200);
    }).catch((err) => {
      res.send(err);
    });

  }).catch((err) => {
    res.send(err); 
  });
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  findTagById(req.params.id).then((targetTag) => {
    targetTag.destroy();
    res.sendStatus(200);
  }).catch((err) => {
    res.send(err);
  });
  // delete on tag by its `id` value
});

module.exports = router;
