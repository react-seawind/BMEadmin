import React, { useEffect, useState } from 'react';
import { getAllCategory } from '../../components/API.jsx';
import CardFour from '../../components/CardFour.tsx';
import CardOne from '../../components/CardOne';
import CardThree from '../../components/CardThree.tsx';
import CardTwo from '../../components/CardTwo.tsx';
import ChartOne from '../../components/ChartOne.tsx';

const ECommerce = () => {
  const [catData, setCatData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allCategories = await getAllCategory();
        setCatData(allCategories);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardOne catData={catData} />
        <CardTwo />
        <CardThree />
        <CardFour />
      </div>
      <div className="grid grid-cols-1 mt-10">
        <ChartOne />
      </div>
    </div>
  );
};

export default ECommerce;
