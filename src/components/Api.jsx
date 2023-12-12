const apiKey = '41130629-725672b730a7b83a7f8073c12';
const apiUrl = 'https://pixabay.com/api/';

const searchImages = async (query, page = 1) => {
const url = `${apiUrl}?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`;

try {
    const response = await fetch(url);
    const data = await response.json();
    const images = data.hits.map((item) => ({
        id: item.id,
        webformatURL: item.webformatURL,
        largeImageURL: item.largeImageURL,
    }));

    return { images, totalImages: data.total };
} catch (error) {
    throw error;
}
};

export { searchImages };