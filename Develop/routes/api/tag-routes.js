const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../Develop/models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
try{
  //.findAll retrieve all  tags from table
  const tagData = await Tag.findAll({
    include: [{model: Product, through: ProductTag}]
  })
  res.status(200).json(tagData)
} catch(err){
  res.status(500).json(err)
}
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
try{
  //.findByPk-obtain only a SINGLE entry from the table
  const tagData = await Tag.findByPk(req.params.id, {include: [{model: Product, through: ProductTag}]});
  if(!tagData){
    res.status(404).json({message:'There is no tag with that ID'});
    return;
  }
  res.status(200).json(tagData);
}catch(err) {
  res.status(500).json(err)
}
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  }catch (err) {
    res.status(400).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    tagData = await Tag.update(
      {tagName:req.body.tagName},
      {where: {
        id: req.params.id,
      },}
    );
    if(!tagData[0]){
      res.status(404).json({message: 'No tag'});
      return;
    }
    res.status(200).json('tag has been updated');
  }catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {id: req.params.id}
    });
    if(!tagData){
      res.status(404).json({message: 'There is no tag with that ID'});
      return
    }
    res.status(200).json(tagData);
  }catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;