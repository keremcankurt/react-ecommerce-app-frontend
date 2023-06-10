import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Home.scss'
import { toast } from 'react-toastify';
import Searchbar from '../../components/searchBar/Searchbar';
import { FaSearch } from 'react-icons/fa';
import {Link, useNavigate } from 'react-router-dom';
import { getCampaignsandStores } from '../../features/user/userService';
import ReactSlider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getRecommendedCampaignProducts, getRecommendedDressProducts, getRecommendedTechnologyProducts } from '../../features/product';
import Slider from '../../components/slider/Slider';


const Home = () => {
  const [campaigns, setCampaigns] = useState()
  const [stores, setStores] = useState()
  const [search, setSearch] = useState("")

  const [RCP, setRCP] = useState()
  const [RTP, setRTP] = useState()
  const [RDP, setRDP] = useState()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCampaignsandStores();
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message);
        }
        setCampaigns(result.campaigns)
        setStores(result.stores)
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRecommendedCampaignProducts();
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message);
        }
        setRCP(result.products)
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRecommendedTechnologyProducts();
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message);
        }
        setRTP(result)
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRecommendedDressProducts();
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message);
        }
        setRDP(result)
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, []);
  
  const navigate = useNavigate();
  const clickCampaign = (id) => {
    navigate(`/campaignproducts?campaignId=${id}`);
  }
  let settings = {
    dots: false,
    autoPlay: true,
    showArrows: true,
    speed: 300,
    slidesToShow: window.innerWidth > 1200 ? (stores?.length < 8 ? stores?.length : 8)
     : window.innerWidth > 900 ? (stores?.length < 4 ? stores?.length : 4)
     : (stores?.length < 3 ? stores?.length : 3),
    slidesToScroll: 1,
    initialSlide: 0,
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      window.location.href = `/productsearch?search=${search}`;
    }
  };
  return (
    <div className='home-container'>
      <div className="search" onKeyPress={handleKeyPress}>
        <Searchbar searchText={search} setSearchText={setSearch}/>
        <Link className='search-button' to={`/productsearch?search=${search}`}> <FaSearch className='search-icon'/></Link>
      </div>
      <Carousel showThumbs={false} autoPlay={true} showArrows={false} interval={3000} infiniteLoop={true} showStatus={false} className='slider'>
        {campaigns?.map(campaign => 
        <div className='campaign' key={campaign._id}>
          <button className='campaign-button'  onClick={() => clickCampaign(campaign._id)}>
            <img className="campaign-image" src={`${process.env.REACT_APP_API_BASE_URL}/images/${campaign?.img}`}  alt="campaign" />
          </button>
          
        
        </div>)}
      </Carousel>

      <h3>Mağazalar</h3>
      <ReactSlider {...settings} className="card-container">
          {stores?.map((store, index) => {
            return (
              <Link to={`/seller?id=${store.id}`}
              className="card"
              key={index}>
                <img className="store-image" src={`${process.env.REACT_APP_API_BASE_URL}/images/${store?.profilePicture}`}  alt="seller" />
                <span>{store.company}</span>
              </Link>
            );
          })}
        </ReactSlider>
        {RCP?.length >=10 && <Slider products={RCP} text="Kampanyalarda Öne Çıkanlar"/>}
        {
          RTP?.length >=10 &&
          <>
            <div className='categories'>
            <Link to='/productsearch?categories=1' className='category'>
              Bilgisayar
            </Link>
            <Link to='/productsearch?categories=3' className='category'>
              Telefon
            </Link>
            <Link to='/productsearch?categories=2' className='category'>
              Tablet
            </Link>
          </div>
          <Slider products={RTP} text="Teknoloji Ürünlerinde Öne Çıkanlar"/>
          </>
         }
        {
          RDP?.length >=10 &&
          <>
            <div className='categories'>
            <Link to='/productsearch?categories=5' className='category'>
              Erkek Giyim
            </Link>
            <Link to='/productsearch?categories=4' className='category'>
              Kadın Giyim
            </Link>
            <Link to='/productsearch?categories=6' className='category'>
              Çocuk Giyim
            </Link>
          </div>
          <Slider products={RTP} text="Giyim Ürünlerinde Öne Çıkanlar"/>
          </>
         }
      
    </div>
  );
};

export default Home;
