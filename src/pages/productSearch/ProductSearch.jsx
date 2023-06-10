import React, { useEffect, useState } from 'react';
import './ProductSearch.scss';
import {useLocation, useNavigate } from 'react-router-dom';
import { getAllProducts } from '../../features/product';
import { toast } from 'react-toastify';
import { Product } from '../../components/product/Product';

const ProductSearch = () => {

  const categories = [
    { id: 1, name: 'Bilgisayar' },
    { id: 2, name: 'Tablet' },
    { id: 3, name: 'Telefon' },
    { id: 4, name: 'Kadın Giyim' },
    { id: 5, name: 'Erkek Giyim' },
    { id: 6, name: 'Çocuk Giyim' },
  ];

  const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [page, setPage] = useState(1);
  const [isCampaign, setIsCampaign] = useState(false);
  const [search, setSearch] = useState(false);
  const [data, setData] = useState(null);
  const [sortType, setsortType] = useState("newest");

  const location = useLocation();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const minPriceParam = queryParams.get('minPrice');
    const maxPriceParam = queryParams.get('maxPrice');
    const encodedCategories = queryParams.get('categories');
    const isCampaignParam = JSON.parse(queryParams.get('isCampaign'));
    const searchParam = queryParams.get('search');
    const pageParam = queryParams.get('page');
    const sortTypeParam = queryParams.get('sortBy');
    let decodedCategories = encodedCategories ? encodedCategories.split('%2C') : [];
    decodedCategories = decodedCategories ? decodedCategories[0]?.split(',').map(category => parseInt(category, 10)) : [];
    setMinPrice(minPriceParam || '');
    setMaxPrice(maxPriceParam || '');
    setSelectedCategories(decodedCategories || []);
    setIsCampaign(isCampaignParam ||false)
    setSearch(searchParam ||"")
    setPage((pageParam && parseInt(pageParam)) || 1)
    setsortType(sortTypeParam || "newest")
    const categoryNames = decodedCategories?.map(categoryId => {
      const category = categories.find(item => item.id === categoryId);
      return category ? category.name : '';
    });
    const fetchData = async () => {
      try {
        
        const query= `?search=${searchParam || ""}${minPriceParam ? "&minPrice="+minPriceParam : ""}${maxPriceParam ? "&maxPrice="+maxPriceParam : ""}${pageParam ? "&page="+pageParam : ""}${sortTypeParam ? "&sortBy="+sortTypeParam : ""}${categoryNames ? "&categories="+JSON.stringify(categoryNames) : ""}${isCampaignParam ? "&isCampaign=true" : ""}`
        
        const response = await getAllProducts(query);
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message);
        }
        setData(result)
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, []);
  const handleMinPriceChange = (event) => {
    let newMinPrice = parseInt(event.target.value);
    if (newMinPrice < 0) {
      newMinPrice = 0;
    }

    if (newMinPrice >= maxPrice) {
      setMaxPrice(null);
    }

    setMinPrice(newMinPrice);
  };

  const handleMaxPriceChange = (event) => {
    let newMaxPrice = parseInt(event.target.value);
    if (newMaxPrice < 0) {
      newMaxPrice = 0;
    }

    setMaxPrice(newMaxPrice);
  };

  const handleCategoryToggle = () => {
    setCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  const handleCategoryChange = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };
  const nextPage = async () => {
    setPage((prevPage) => prevPage + 1);
    handleApplyFilters(page+1);
  };
  
  
  const previousPage = () => {
    setPage(page - 1);
    handleApplyFilters(page-1);
  };
  const navigate = useNavigate()
  const handleApplyFilters = (currentPage, currentSortType) => {
    const queryParams = new URLSearchParams();
    minPrice && queryParams.append('minPrice', minPrice);
    maxPrice && queryParams.append('maxPrice', maxPrice);
    isCampaign && queryParams.append('isCampaign', isCampaign);
    search && queryParams.append('search', search);
    currentPage && queryParams.append('page', currentPage);
    currentSortType && queryParams.append('sortBy', currentSortType);
    const encodedCategories = selectedCategories?.map((category) => encodeURIComponent(category));
    selectedCategories?.length > 0 && queryParams.append('categories', encodedCategories.join(','));
    const newUrl = `/productsearch?${queryParams.toString()}`;
    navigate(newUrl);
    const fetchData = async () => {
      try {
        const categoryNames = selectedCategories?.map(categoryId => {
          const category = categories.find(item => item.id === categoryId);
          return category ? category.name : '';
        });
        const query= `?search=${search || ""}${minPrice ? "&minPrice="+minPrice : ""}${maxPrice ? "&maxPrice="+maxPrice : ""}${currentSortType ? "&sortBy="+currentSortType : ""}${currentPage ? "&page="+currentPage : ""}${categoryNames.length > 0 ? "&categories="+JSON.stringify(categoryNames) : ""}${isCampaign ? "&isCampaign=true" : ""}`
        
        const response = await getAllProducts(query);
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message);
        }
        setData(result)
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchData();
  };

  
  
  const handleIsCampaignToggle = () => {
    setIsCampaign(!isCampaign)
  }
  const handleSortChange = (event) => {
    setsortType(event.target.value);
    handleApplyFilters(page, event.target.value)
  };
  return (
    <div className="product-search-container">
      <div className="sidebar">
        <h3>Filtrele</h3>
        <div className="f-search-input">
          <input type="text" placeholder="Ürün Adı" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="price-range">
          <div>
            <label htmlFor="min-price">Min</label>
            <input type="number" id="min-price" value={minPrice || ''} onChange={handleMinPriceChange} min="0" />
          </div>
          <div>
            <label htmlFor="max-price">Max</label>
            <input
              type="number"
              id="max-price"
              value={maxPrice || ''}
              onChange={handleMaxPriceChange}
              min={minPrice ? minPrice + 1 : 1}
            />
          </div>
        </div>

        <div className="checkbox-section">
          <label htmlFor="campaign-checkbox">
            <input type="checkbox" id="campaign-checkbox" checked={isCampaign || false} onChange={handleIsCampaignToggle} />
            Kampanyalı Ürünler
          </label>
        </div>
        <div className="category-dropdown">
          <button className="category-toggle" onClick={handleCategoryToggle}>
            Kategori
          </button>
          {isCategoryDropdownOpen && (
            <div className="category-list">
              {categories.map((category) => (
                <label key={category.id} htmlFor={`category-${category.id}`}>
                  <input
                    type="checkbox"
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryChange(category.id)}
                  />
                  {category.name}
                </label>
              ))}
            </div>
          )}
        </div>
        <div className="apply-filters">
          <button className="apply-button" onClick={()=> handleApplyFilters(page, sortType)}>
            Uygula
          </button>
        </div>
      </div>
      <div className="product-list">
      {data?.products?.length > 0 ?
        <>
        <div className="sort-section">
          <select id="sort-select" value={sortType} onChange={handleSortChange}>
            <option value="newest" selected={sortType === "newest"}>En Yeni</option>
            <option value="lowest-price" selected={sortType === "lowest-price"}>En Düşük Fiyat</option>
            <option value="highest-price" selected={sortType === "highest-price"}>En Yüksek Fiyat</option>
            <option value="most-favorited" selected={sortType === "most-favorited"}>En Çok Beğenilen</option>
          </select>
        </div>
          <div className='search-products'>
            {data?.products?.map(product => <Product product={product} key={product._id}/>)}
          </div>
          {
            data && Object.keys(data?.pagination)?.length > 0 &&
            <div className='buttons-pagination'>
              <button onClick={previousPage} disabled={!data?.pagination?.previous && true}>{'<'}</button>
                {page}
              <button onClick={nextPage} disabled={!data?.pagination?.next && true}>{'>'}</button>
            </div>
          }
        </>
        : 
        <h3>Ürün bulunamadı...</h3>
      }
      </div>
      
    </div>
  );
};

export default ProductSearch;
