import { useState, useEffect, useRef } from 'react';
import { fetchSearch } from '../search-api';
import toast, { Toaster } from 'react-hot-toast';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Searchbar from './Searchbar/Searchbar';
import LoadMore from './LoadMore/LoadMore';
import Load from './Loader/Load';
import ImageGallery from './ImageGallery/ImageGallery';

export const App = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const lightboxRef = useRef(null);

  useEffect(() => {
    if (search === '') return;

    (async () => {
      await fetchImages(search, page);
    })();
  }, [search, page]);

  useEffect(() => {
    if (images.length > 0) {
      lightboxRef.current = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
    }

    return () => {
      if (lightboxRef.current) {
        lightboxRef.current.destroy();
      }
    };
  }, [images]);

  const fetchImages = async (search, page) => {
    try {
      setIsLoading(true);
      const fetchedImages = await fetchSearch(search, page);
      const { hits, totalHits } = fetchedImages;

      if (hits.length === 0) {
        toast.error('Sorry, no images available');
        return;
      }

      if (page === 1) {
        toast.success(`Found ${totalHits} related search result`);
      }

      if (page * 12 >= totalHits) {
        setIsEnd(true);
        toast.error('You reach the end of search result');
      }

      setImages(prevState => [...prevState, ...hits]);
      console.log(hits, totalHits);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = query => {
    const newSearch = query.trim().toLowerCase();

    if (newSearch === '') {
      toast.error('Please fill the textbox. Please try again');
      return;
    }

    if (newSearch === search) {
      toast.error('Duplicate text search item. Please provide new one');
      return;
    }

    if (newSearch !== search) {
      setSearch(newSearch);
      setPage(1);
      setImages([]);
    }
  };

  const handleClick = () => {
    if (!isEnd) {
      setPage(prevState => prevState + 1);
    } else {
      toast.error("You've reached the end of the search results");
    }
  };

  return (
    <div>
      <Searchbar onSubmit={handleSubmit} />

      <ImageGallery photos={images} />

      {images.length >= 1 && !isEnd && <LoadMore onClick={handleClick} />}
      {isError && toast.error('Oops, something went wrong! Reload this page!')}

      {isLoading && <Load />}

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};
