import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductListComponent.css';

function ProductListComponent() {
  const [categories, setCategories] = useState({
    인기상품: [],
    주간특가: [],
    메거진: [],
    아울렛: [],
  });
  const [categorySortingOptions, setCategorySortingOptions] = useState({
    인기상품: 'latest',
    주간특가: 'latest',
    메거진: 'latest',
    아울렛: 'latest',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const categoriesToFetch = ['인기상품', '주간특가', '메거진', '아울렛'];
    categoriesToFetch.forEach(fetchCategoryData);
  }, []);

  async function fetchCategoryData(category) {
    try {
      const encodedCategory = encodeURIComponent(category);
      const url = `http://ec2-43-203-169-73.ap-northeast-2.compute.amazonaws.com:8080/api/product?categoryName=${encodedCategory}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok.');

      const data = await response.json();
      console.log(data);
      if (Array.isArray(data)) {
        const transformedData = data.map((product) => ({
          id: product.productCid,
          title: product.productName,
          price: product.productPrice,
          image: product.productImages[0]?.productImagePath || '',
        }));
        setCategories((prev) => ({ ...prev, [category]: transformedData }));
      } else {
        console.error('Expected data to be an array but got:', typeof data);
      }
    } catch (error) {
      console.error('Error fetching category data:', error);
    }
  }

  function sortProducts(products, option) {
    switch (option) {
      case 'latest':
        return [...products].sort((a, b) => b.id - a.id);
      case 'highestPrice':
        return [...products].sort((a, b) => b.price - a.price);
      case 'lowestPrice':
        return [...products].sort((a, b) => a.price - b.price);
      default:
        return products;
    }
  }

  function handleSortingOptionChange(category, option) {
    setCategorySortingOptions((prev) => ({
      ...prev,
      [category]: option,
    }));
  }

  function handleProductClick(productId) {
    navigate(`/detail/${productId}`);
  }

  return (
    <div>
      <div className="category-section product-0" key="인기상품">
        <h1 className="product-grid-title">
          인기상품
          <select
            className="category-dropdown"
            value={categorySortingOptions['인기상품']}
            onChange={(e) =>
              handleSortingOptionChange('인기상품', e.target.value)
            }
          >
            <option value="latest">최신순</option>
            <option value="highestPrice">가격 높은 순</option>
            <option value="lowestPrice">가격 낮은 순</option>
          </select>
        </h1>
        <div className="product-grid">
          {sortProducts(
            categories['인기상품'],
            categorySortingOptions['인기상품']
          ).map((product) => (
            <div
              key={product.id}
              className="product-item"
              onClick={() => handleProductClick(product.id)}
            >
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
              <h2 className="product-name">{product.title}</h2>
              <p className="product-price">{`${product.price} 원`}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="category-section product-1" key="주간특가">
        <h1 className="product-grid-title">
          주간특가
          <select
            className="category-dropdown"
            value={categorySortingOptions['주간특가']}
            onChange={(e) =>
              handleSortingOptionChange('주간특가', e.target.value)
            }
          >
            <option value="latest">최신순</option>
            <option value="highestPrice">가격 높은 순</option>
            <option value="lowestPrice">가격 낮은 순</option>
          </select>
        </h1>
        <div className="product-grid">
          {sortProducts(
            categories['주간특가'],
            categorySortingOptions['주간특가']
          ).map((product) => (
            <div
              key={product.id}
              className="product-item"
              onClick={() => handleProductClick(product.id)}
            >
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
              <h2 className="product-name">{product.title}</h2>
              <p className="product-price">{`${product.price} 원`}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="category-section product-2" key="메거진">
        <h1 className="product-grid-title">
          메거진
          <select
            className="category-dropdown"
            value={categorySortingOptions['메거진']}
            onChange={(e) =>
              handleSortingOptionChange('메거진', e.target.value)
            }
          >
            <option value="latest">최신순</option>
            <option value="highestPrice">가격 높은 순</option>
            <option value="lowestPrice">가격 낮은 순</option>
          </select>
        </h1>
        <div className="product-grid">
          {sortProducts(
            categories['메거진'],
            categorySortingOptions['메거진']
          ).map((product) => (
            <div
              key={product.id}
              className="product-item"
              onClick={() => handleProductClick(product.id)}
            >
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
              <h2 className="product-name">{product.title}</h2>
              <p className="product-price">{`${product.price} 원`}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="category-section product-3" key="아울렛">
        <h1 className="product-grid-title">
          아울렛
          <select
            className="category-dropdown"
            value={categorySortingOptions['아울렛']}
            onChange={(e) =>
              handleSortingOptionChange('아울렛', e.target.value)
            }
          >
            <option value="latest">최신순</option>
            <option value="highestPrice">가격 높은 순</option>
            <option value="lowestPrice">가격 낮은 순</option>
          </select>
        </h1>
        <div className="product-grid">
          {sortProducts(
            categories['아울렛'],
            categorySortingOptions['아울렛']
          ).map((product) => (
            <div
              key={product.id}
              className="product-item"
              onClick={() => handleProductClick(product.id)}
            >
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
              <h2 className="product-name">{product.title}</h2>
              <p className="product-price">{`${product.price} 원`}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductListComponent;
