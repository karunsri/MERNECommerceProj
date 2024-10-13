import productModel from '../Model/products.model.js';


export function createProduct(req, res) {
    const { name, price, rating, description } = req.body;

    const newProduct = new productModel({
        name: name,
        price: price,
        rating: rating,
        description: description,
    });

    newProduct.save().then((data) => {
        if(!data){
            return res.status(400).json({message: "Data Not Found"});
        }
        res.send(data);
    })
}

export function fetchProducts(req, res) {
    productModel.find().then((data) => {
        if(!data){
            return res.status(400).send("Something went wrong");
        }
        res.send(data);
    }).catch((err) => {
        res.status(500).json({message: "Server error" || err.message});
    });

}


export function updateProduct(req, res) {
    const { id } = req.params; 
    const { name, price, rating, description } = req.body; 

    productModel.findByIdAndUpdate(
        id, 
        { name, price, rating, description }, 
    )
    .then((updatedProduct) => {
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(updatedProduct);
    })
    .catch((error) => {
        res.status(500).json({ message: "Server error", error: error.message });
    });
}


 
