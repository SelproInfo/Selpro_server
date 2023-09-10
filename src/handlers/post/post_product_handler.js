const { postProductC } = require("../../controllers/post/post_prod_controller.js");

function createdProd(req, res) {
  const { data } = req.body;
  postProductC(data)
    .then(newProducts => {
      res.status(201).json(newProducts);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
}

module.exports = { createdProd };