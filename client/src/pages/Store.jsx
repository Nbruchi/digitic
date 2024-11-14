import Meta from "../components/Meta";
import Color from "../components/Color";
import { useEffect, useState } from "react";
import Container from "../components/Container";
import Breadcrumb from "../components/Breadcrumb";
import ProductCard from "../components/ProductCard";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrands } from "../features/brands/brandSlice";
import { getAllColors } from "../features/colors/colorSlice";
import { getAllProducts } from "../features/products/productSlice";
import { getAllCategories } from "../features/categories/categorySlice";

const Store = () => {
  const dispatch = useDispatch();
  const [tag, setTag] = useState("");
  const [grid, setGrid] = useState(4);
  const [tags, setTags] = useState([]);
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [sort, setSort] = useState("");
  const [colors, setColors] = useState([]);
  const [brands, setBrands] = useState([]);
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [categories, setCategories] = useState([]);

  const brandState = useSelector((state) => state.brand?.brands);
  const colorState = useSelector((state) => state.color?.colors);
  const productState = useSelector((state) => state.product?.products);
  const categoryState = useSelector((state) => state.category?.categories);

  useEffect(() => {
    dispatch(getAllBrands());
    dispatch(getAllColors());
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getAllProducts({ sort, tag, brand, category, color, minPrice, maxPrice })
    );
  }, [dispatch, sort, tag, category, color, brand, minPrice, maxPrice]);

  useEffect(() => {
    let newTags = [];
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      newTags.push(element.tags);
    }
    setTags(newTags);
  }, [productState]);

  useEffect(() => {
    let newBrands = [];

    for (let index = 0; index < brandState?.length; index++) {
      const element = brandState[index];
      newBrands.push(element);
    }
    setBrands(newBrands);
  }, [brandState]);

  useEffect(() => {
    let newCategories = [];

    for (let index = 0; index < categoryState?.length; index++) {
      const element = categoryState[index];
      newCategories.push(element);
    }
    setCategories(newCategories);
  }, [categoryState]);

  useEffect(() => {
    let newColors = [];

    for (let index = 0; index < colorState?.length; index++) {
      const element = colorState[index];
      newColors.push(element);
    }
    setColors(newColors);
  }, [colorState]);

  return (
    <>
      <Meta title="Our Store" />
      <Breadcrumb title="Our Store" />
      <Container className="store-wrapper">
        <div className="row">
          <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Shop by Categories</h3>
              <div>
                <ul className="ps-0">
                  {categories &&
                    [...new Set(categories)].map((item, index) => (
                      <li key={index} onClick={() => setCategory(item.title)}>
                        {item.title}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="title">Filter by</h3>
              <div>
                <h5 className="sub-title">Price</h5>
                <div className="d-flex align-items-center gap-10">
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput"
                      placeholder="From"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <label htmlFor="floatingInput">From</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput1"
                      placeholder="To"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                    <label htmlFor="floatingInput1">To</label>
                  </div>
                </div>
                <h5 className="sub-title">Colors</h5>
                <div>
                  <Color colors={colors} setColor={setColor} />
                </div>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="sub-title">Product Tags</h3>
              <div>
                <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                  {tags &&
                    [...new Set(tags)]?.map((item, index) => {
                      return (
                        <span
                          className="badge bg-light text-secondary rounded-3 py-2 px-3 text-capitalize cursor-pointer"
                          key={index}
                          onClick={() => setTag(item)}
                        >
                          {item}
                        </span>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="sub-title">Product Brands</h3>
              <div>
                <div className="product-brands d-flex flex-wrap align-items-center gap-10">
                  {brands?.length &&
                    brands?.map((item, index) => (
                      <span
                        className="badge bg-light text-secondary rounded-3 py-2 px-3 text-capitalize cursor-pointer"
                        key={index}
                        onClick={() => setBrand(item.title)}
                      >
                        {item.title}
                      </span>
                    ))}
                </div>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Random Products</h3>
              <div>
                <div className="random-products d-flex mb-3">
                  <div className="w-50">
                    <img
                      src="images/headphone.jpg"
                      alt="headphone"
                      className="img-fluid"
                    />
                  </div>
                  <div className="w-50">
                    <h5>
                      Kids Headphones bulk 10 pack multi-colored for students
                    </h5>
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <b>$300</b>
                  </div>
                </div>
                <div className="random-products d-flex mb-3">
                  <div className="w-50">
                    <img
                      src="images/watch.jpg"
                      alt="watch"
                      className="img-fluid"
                    />
                  </div>
                  <div className="w-50">
                    <h5>Apple Watch Series 2 - 42 Mm Stainless Steel..</h5>
                    <ReactStars
                      count={5}
                      size={24}
                      value={3}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <b>$100</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="filter-sort-grid">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-10">
                  <p className="mb-0 text-nowrap">Sort by:</p>
                  <select
                    className="form-select form-control"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="title">Alphabetically, A-Z</option>
                    <option value="-title">Alphabetically, Z-A</option>
                    <option value="price">Price, low to high</option>
                    <option value="-price">Price, high to low</option>
                    <option value="createdAt">Date, old to new</option>
                    <option value="-createdAt">Date, new to old</option>
                  </select>
                </div>
                <div className="d-flex align-items-center gap-10">
                  <p className="total-products mb-0">
                    {productState?.length} Products
                  </p>
                  <div className="d-flex gap-10 align-items-center grid">
                    <img
                      src="images/gr4.svg"
                      alt="grid"
                      className="d-block img-fluid"
                      onClick={() => setGrid(3)}
                    />
                    <img
                      src="images/gr3.svg"
                      alt="grid"
                      className="d-block img-fluid"
                      onClick={() => setGrid(4)}
                    />
                    <img
                      src="images/gr2.svg"
                      alt="grid"
                      className="d-block img-fluid"
                      onClick={() => setGrid(6)}
                    />
                    <img
                      src="images/gr.svg"
                      alt="grid"
                      className="d-block img-fluid"
                      onClick={() => setGrid(12)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="products-list pb-5">
              <div className="d-flex gap-10 flex-wrap">
                {productState.map((product) => (
                  <ProductCard
                    grid={grid}
                    key={product?._id}
                    product={product}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Store;
