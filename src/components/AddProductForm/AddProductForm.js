import "./AddProductForm.css";
import {useState} from "react";

const AddProductForm = ({socket}) => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("games");
    const [price, setPrice] = useState("0");
    const [stock, setStock] = useState("1");
    const [image, setImage] = useState("");
    const [productAdded, setProductAdded] = useState(false);

    const addProduct = (event) => {
        event.preventDefault();

        const product = {
            name: name,
            price: Number(price),
            category: category,
            img: image,
            colors: ["red", "blue", "green"],
            minimumStock: 1,
            rating: 0,
            reviews: 0,
            stars: 0,
            stock: Number(stock),
            description: description
        };

        console.log(product);

        socket.emit("addProduct", product);

        setName("");
        setPrice("");
        setCategory("");
        setImage("");
        setStock("");
        setDescription("");
        setProductAdded(true);

        setTimeout(() => {
            setProductAdded(false);
        }, 5000);
    };

    return (
        <>
            <form id="add-product-form" onSubmit={addProduct}>
                <label htmlFor="name">Product Name: </label>
                <input type="text" id="name" name="name" value={name}
                       onChange={event => setName(event.target.value)}/>
                <label htmlFor="description">Product Description: </label>
                <input type="text" id="description" name="description" value={description}
                       onChange={event => setDescription(event.target.value)}/>
                <label htmlFor="category">Category: </label>
                <select id="category" name="category" value={category}
                        onChange={event => setCategory(event.target.value)}>
                    <option disabled>Select a category...</option>
                    <option value="games">Games</option>
                    <option value="figures">Figures</option>
                    <option value="mangas">Mangas</option>
                </select>
                <label htmlFor="price">Price: </label>
                <input type="number" id="price" name="price" value={price}
                       onChange={event => setPrice(event.target.value)}/>
                <label htmlFor="stock">Stock: </label>
                <input type="number" id="stock" name="stock" value={stock}
                       onChange={event => setStock(event.target.value)}/>
                <label htmlFor="image">Link to image: </label>
                <input type="text" id="image" name="image" value={image}
                       onChange={event => setImage(event.target.value)}/>
                <button type="submit">Save Product</button>
            </form>
            {productAdded ?
                <div className={"succeed-message"} hidden={!productAdded}>
                    <p>Product Added!</p>
                </div>
                :
                <p></p>
            }

        </>
    );
};

export default AddProductForm;