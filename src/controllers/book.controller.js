import { v4 as uuidv4 } from 'uuid'




const book = {
    "title": "Some Book Title",
    "authorId": "123e4567-e89b-12d3-a456-426614174000",
    "genreId": "123e4567-e89b-12d3-a456-426614174000",
    "price": 19.99,
    "stock": 10,
    "publishedDate": "2023-06-18",
    "status": "available",
    "imageUrls": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
    "description": "This is a description of the book."
};


export const postBook = async (req, res) => {
    try {
        const uuid = uuidv4();




    } catch (e) {
        console.log(e);
        return res.status(500).send({
            message: "Server Error",
            error: e
        });
    }
}