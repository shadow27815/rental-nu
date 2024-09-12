import React, { useEffect, useState } from "react";
import { listby } from "../../functions/product";
import CategoryGrid from "./CategoryGrid";

const SpaceNew = ({ searchTerm, filter }) => {
  const [products, setProducts] = useState([]);
  const [hasResults, setHasResults] = useState(true);

  useEffect(() => {
    loadData();
  }, [searchTerm, filter]);

  const loadData = async () => {
    try {
      const res = await listby(100, "createdAt", "asc");
      const filteredProducts = filterAndCategorizeProducts(res.data, searchTerm, filter);
      setProducts(filteredProducts);
      setHasResults(Object.keys(filteredProducts).length > 0);
    } catch (err) {
      console.error(err);
    }
  };

  const filterAndCategorizeProducts = (products, searchTerm, filter) => {
    let filtered = products;

    // กรองข้อมูลตามคำค้นหา
    if (searchTerm) {
      filtered = filtered.filter(product => ['price', 'name', 'detail', 'location']
        .some(key => product[key]?.toString().toLowerCase().includes(searchTerm.toLowerCase())));
    }

    // กรองข้อมูลตามตัวกรอง
    if (filter.price) {
      filtered.sort((a, b) => filter.price === 'low-to-high' ? a.price - b.price : b.price - a.price);
    }
    if (filter.location) {
      filtered = filtered.filter(product => product.location.toLowerCase() === filter.location.toLowerCase());
    }
    if (filter.status) {
      filtered = filtered.filter(product => product.status === filter.status);
    }

    // จัดประเภทตามสถานที่
    return filtered.reduce((categories, product) => {
      const location = product.location || 'Other';
      if (!categories[location]) categories[location] = [];
      categories[location].push(product);
      return categories;
    }, {});
  };

  return (
    <div style={{ padding: '20px', overflow: 'auto' }}>
      <CategoryGrid products={products} hasResults={hasResults} />
    </div>
  );
};

export default SpaceNew;
