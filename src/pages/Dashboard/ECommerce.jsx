import React, { useEffect, useState } from 'react';
import { getAllCategory } from '../../API/CategoryApi.jsx';
import CardFour from '../../components/CardFour.jsx';
import CardOne from '../../components/CardOne';
import CardThree from '../../components/CardThree.jsx';
import CardTwo from '../../components/CardTwo.jsx';
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
        <CardTwo catData={catData} />
        <CardThree catData={catData} />
        <CardFour catData={catData} />
      </div>
    </div>
  );
};

export default ECommerce;
