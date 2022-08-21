import React,{  useState,useEffect } from 'react';
import { axiosInstance } from '../../network/axiosInstance';
import {Chart as ChartJs,BarElement,CategoryScale,LinearScale,Tooltip,Title,Legend} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Loader from '../Loader/Loader';

ChartJs.register(
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
  Legend,
  BarElement
);


const Statistics = () => {

const [charts,setCharts]=useState([]);

useEffect(()=>{
  const data=async()=>{
    await axiosInstance.get('/admin/users',{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`}
    })
    .then((res)=>{

        setCharts(res.data);
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  data();
},[]);


const options = {
  responsive:true,
  plugins: {
    legend: {
      position: 'top' ,
      labels: {
        fontSize: 25,

      },
    },
    title: {
      display: true,
      text: 'Chart data for Users and Posts',
      color:'black',
      align:'start',
      font:{
        size:16
      },
 
    },
  },


}

const labels=charts?.map(el=>el.firstName);

var data = {
  labels, 
  datasets: [
    {
    label: 'Posts',
    data: charts?.map((el)=>el.sharedPosts.length),
    backgroundColor: '#9370db',
    borderColor: '#9370db',
    borderWidth: 1
  },

]
};

    return (
       <div>
        {
        !data?<Loader/>:
         <Bar
         width={200}
         height={100}
         data={data}
          options={options}/>
          }
    
       </div>
    );
}

export default Statistics;
