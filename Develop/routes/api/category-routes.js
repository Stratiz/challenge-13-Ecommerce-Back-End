const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

function findCategoryById(id) {
  return Category.findByPk(id, {
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      },
    ],
  });
}

router.get('/', (req, res) => {
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      },
    ],
  }).then((categories) => {
    res.json(categories);
  }).catch((err) => { res.send(err); });
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  
  findCategoryById(req.params.id).then((categories) => {
    res.json(categories);
  }).catch((err) => {
    res.send(err); 
  });
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body).then(() => {
    res.sendStatus(200);
  }).catch((err) => {
    res.send(err);
  });
});

router.put('/:id', (req, res) => {
  findCategoryById(req.body.id).then((targetCategory) => {
    targetCategory.update(req.body)
    .then(() => {
      targetCategory.save();
      res.sendStatus(200);
    }).catch((err) => {
      res.send(err);
    });

  }).catch((err) => {
    res.send(err); 
  });
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  findCategoryById(req.body.id).then((targetCategory) => {
    targetCategory.destroy();
    res.sendStatus(200);
  }).catch((err) => {
    res.send(err);
  });
  // delete a category by its `id` value
});

module.exports = router;
