import './ProductListComponent.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProductListComponent() {
  const [categories, setCategories] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('electronics');
  const [categorySortingOptions, setCategorySortingOptions] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Fake Store API에서 카테고리별 상품 데이터를 가져오는 함수
    const fetchCategoryData = async (category) => {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/category/${category}`
        );
        if (response.ok) {
          const data = await response.json();
          setCategories((prevCategories) => ({
            ...prevCategories,
            [category]: data,
          }));
        } else {
          console.error(`API 호출이 실패했습니다. 카테고리: ${category}`);
        }
      } catch (error) {
        console.error(
          `API 호출 중 오류가 발생했습니다. 카테고리: ${category}`,
          error
        );
      }
    };

    // 각 카테고리별 데이터를 가져오는 함수를 호출합니다.
    fetchCategoryData('electronics');
    fetchCategoryData('jewelery');
    fetchCategoryData('men-clothing');
    fetchCategoryData('women-clothing');
  }, []);

  // 상품을 정렬하는 함수
  const sortProducts = (products, option) => {
    if (!products) {
      return []; // products가 null 또는 undefined인 경우 빈 배열 반환
    }

    switch (option) {
      case 'latest':
        return [...products].sort((a, b) => b.id - a.id); // 최신순
      case 'highestPrice':
        return [...products].sort((a, b) => b.price - a.price); // 가격 높은 순
      case 'lowestPrice':
        return [...products].sort((a, b) => a.price - b.price); // 가격 낮은 순
      default:
        return products;
    }
  };

  // 정렬 옵션을 변경할 때 호출되는 함수
  const handleSortingOptionChange = (category, option) => {
    setCategorySortingOptions((prevOptions) => ({
      ...prevOptions,
      [category]: option,
    }));
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductClick = (productId) => {
    navigate(`/detail`, { state: { productId } }); // 상품 ID를 상태로 전달하며 Detail 페이지로 이동
  };

  return (
    <div>
      <div className="category-section">
        <h1 className="product-grid-title product-0">
          Electronics
          {/* 정렬 옵션 선택 드롭다운 메뉴 */}
          <select
            className="category-dropdown"
            value={categorySortingOptions['electronics'] || 'latest'}
            onChange={(e) =>
              handleSortingOptionChange('electronics', e.target.value)
            }
          >
            <option value="latest">최신순</option>
            <option value="highestPrice">가격 높은 순</option>
            <option value="lowestPrice">가격 낮은 순</option>
          </select>
        </h1>

        <div className="product-grid">
          {sortProducts(
            categories['electronics'],
            categorySortingOptions['electronics'] || 'latest'
          ).map((product) => (
            <div
              key={product.id}
              className="product-item"
              onClick={() => handleProductClick(product.id)} // productId만 인자로 전달
            >
              <img
                src={product.image}
                alt={`${product.title} 이미지`}
                className="product-image"
              />
              <h2 className="product-name">{product.title}</h2>
              <p className="product-price">{`${product.price} 원`}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="category-section">
        <h1 className="product-grid-title product-1">
          Jewelry
          {/* 정렬 옵션 선택 드롭다운 메뉴 */}
          <select
            className="category-dropdown"
            value={categorySortingOptions['jewelery'] || 'latest'}
            onChange={(e) =>
              handleSortingOptionChange('jewelery', e.target.value)
            }
          >
            <option value="latest">최신순</option>
            <option value="highestPrice">가격 높은 순</option>
            <option value="lowestPrice">가격 낮은 순</option>
          </select>
        </h1>

        <div className="product-grid">
          {sortProducts(
            categories['jewelery'],
            categorySortingOptions['jewelery'] || 'latest'
          ).map((product) => (
            <div
              key={product.id}
              className="product-item"
              onClick={() => handleProductClick(product.id)} // productId만 인자로 전달
            >
              <img
                src={product.image}
                alt={`${product.title} 이미지`}
                className="product-image"
              />
              <h2 className="product-name">{product.title}</h2>
              <p className="product-price">{`${product.price} 원`}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="category-section">
        <h1 className="product-grid-title product-2">
          Men's Clothing
          {/* 정렬 옵션 선택 드롭다운 메뉴 */}
          <select
            className="category-dropdown"
            value={categorySortingOptions['men-clothing'] || 'latest'}
            onChange={(e) =>
              handleSortingOptionChange('men-clothing', e.target.value)
            }
          >
            <option value="latest">최신순</option>
            <option value="highestPrice">가격 높은 순</option>
            <option value="lowestPrice">가격 낮은 순</option>
          </select>
        </h1>

        <div className="product-grid">
          {sortProducts(
            categories['men-clothing'],
            categorySortingOptions['men-clothing'] || 'latest'
          ).map((product) => (
            <div
              key={product.id}
              className="product-item"
              onClick={() => handleProductClick(product.id)} // productId만 인자로 전달
            >
              <img
                src={product.image}
                alt={`${product.title} 이미지`}
                className="product-image"
              />
              <h2 className="product-name">{product.title}</h2>
              <p className="product-price">{`${product.price} 원`}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="category-section">
        <h1 className="product-grid-title product-3">
          Women's Clothing
          {/* 정렬 옵션 선택 드롭다운 메뉴 */}
          <select
            className="category-dropdown"
            value={categorySortingOptions['women-clothing'] || 'latest'}
            onChange={(e) =>
              handleSortingOptionChange('women-clothing', e.target.value)
            }
          >
            <option value="latest">최신순</option>
            <option value="highestPrice">가격 높은 순</option>
            <option value="lowestPrice">가격 낮은 순</option>
          </select>
        </h1>

        <div className="product-grid">
          {sortProducts(
            categories['women-clothing'],
            categorySortingOptions['women-clothing'] || 'latest'
          ).map((product) => (
            <div
              key={product.id}
              className="product-item"
              onClick={() => handleProductClick(product.id)} // productId만 인자로 전달
            >
              <img
                src={product.image}
                alt={`${product.title} 이미지`}
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
