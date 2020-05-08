let authors = [
	{ name: 'author1', age: '26', id: 1 },
	{ name: 'author2', age: '32', id: 2 },
	{ name: 'author3', age: '99', id: 3 },
]

let books = [
	{ name: 'Book1', genre: 'action', id: 1, authorId: 1 },
	{ name: 'Book2', genre: 'drama', id: 2, authorId: 2 },
	{ name: 'Book3', genre: 'self-help', id: 3, authorId: 3 },
	{ name: 'Book4', genre: 'self-help', id: 3, authorId: 2 },
]

module.exports = {
	authors: authors,
	books: books
}