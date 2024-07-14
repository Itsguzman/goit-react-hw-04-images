import { Component } from 'react';
import { fetchSearch } from '../search-api';
import toast, { Toaster } from 'react-hot-toast';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Searchbar from './Searchbar/Searchbar';
import LoadMore from './LoadMore/LoadMore';
import Load from './Loader/Load';
import ImageGallery from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    search: '',
    page: 1,
    images: [],
    isLoading: false,
    isError: false,
    isEnd: false,
  };

  componentDidUpdate = async (_prevProps, prevState) => {
    const { search, page } = this.state;

    if (prevState.search !== search || prevState.page !== page) {
      await this.fetchImages(search, page);
    }
    if (prevState.images !== this.state.images) {
      this.initializeLightbox();
    }
  };

  componentWillUnmount() {
    if (this.lightbox) {
      this.lightbox.destroy();
    }
  }

  fetchImages = async (search, page) => {
    try {
      this.setState({ isLoading: true });
      const fetchedImages = await fetchSearch(search, page);

      const { hits, totalHits } = fetchedImages;

      if (hits.length === 0) {
        toast.error('Sorry, no images available');
        return;
      }

      if (page === 1) {
        toast.success(`Found ${totalHits} search result`);
      }

      if (page * 12 >= totalHits) {
        this.setState({ isEnd: true });
        toast.error('You reach the end of search result');
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
      }));
      console.log(hits, totalHits);
    } catch {
      this.setState({ isError: true });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  initializeLightbox = () => {
    if (this.lightbox) {
      this.lightbox.destroy();
    }
    this.lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  };

  handleSubmit = query => {
    const { search } = this.state;
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
      this.setState({ search: newSearch, page: 1, images: [] });
    }
  };

  handleClick = () => {
    if (!this.state.isEnd) {
      this.setState(prevState => ({ page: prevState.page + 1 }));
    } else {
      toast.error("You've reached the end of the search results");
    }
  };
  render() {
    const { images, isLoading, isError, isEnd } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />

        <ImageGallery photos={images} />

        {images.length >= 1 && !isEnd && (
          <LoadMore onClick={this.handleClick} />
        )}
        {isError &&
          toast.error('Oops, something went wrong! Reload this page!')}

        {isLoading && <Load />}

        <Toaster position="top-right" reverseOrder={false} />
      </div>
    );
  }
}
