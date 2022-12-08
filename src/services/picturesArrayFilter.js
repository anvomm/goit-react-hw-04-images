export const filterPicturesArray = array =>
  array.map(({ id, webformatURL, largeImageURL }) => ({
    id,
    webformatURL,
    largeImageURL,
  }));
