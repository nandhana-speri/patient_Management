import React, { useEffect, useState } from 'react';
import './index.css';
import { useSelector, useDispatch } from 'react-redux';
import Chart from './utils';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { diseaseListGetAction, getdiseaseInformation } from '../Profile/action';
import { getConsultation } from '../Consultation/action';
import { getVaccination } from '../Vaccination/action';
import { getPayment } from '../Payment/action';

function DashboardCounter() {
  const dispatch = useDispatch();
  const { diseaseInfo } = useSelector((state) => state.profileReducer);
  const { consultationData } = useSelector(
    (state) => state.consultationReducer
  );
  const { role } = useSelector((state) => state.commonReducer);
  const { vaccinationData } = useSelector((state) => state.vaccineReducer);
  const { paymentData } = useSelector((state) => state.paymentReducer);
  console.log(vaccinationData);

  useEffect(() => {
    dispatch(getdiseaseInformation());
    dispatch(getConsultation(1, 5));
    dispatch(getVaccination(1, 5));
    dispatch(getPayment(1, 5));
  }, []);
  const tripCounts = [];

  //length
  const diseaseValue = diseaseInfo ? diseaseInfo?.length : 0;
  const consultationValue = consultationData ? consultationData?.length : null;
  const vaccinationValue = vaccinationData ? vaccinationData?.length : null;
  const paymentValue = paymentData ? paymentData?.length : null;

  for (let i = 0; i < 12; i++) {
    const filteredData = consultationData?.filter((e) => {
      const yearMonth = e.date?.substr(0, 7); // Extract year and month from date string
      const dateObj = new Date(Date.parse(yearMonth)); // Create new Date object using year and month values
      return dateObj.getMonth() === i; // Filter by month i
    });
    let count = 0;
    filteredData?.forEach((trip) => {
      count += 1;
    });
    tripCounts.push(count);
  }

  //   const currentDate = new Date(); // Get the current date
  // const currentMonth = currentDate.getMonth(); // Get the current month (0-indexed)

  // const filteredData = consultationData?.filter((e) => {
  //   const yearMonth = e.date?.substr(0, 7);
  //   const dateObj = new Date(Date.parse(yearMonth));

  //   return dateObj.getMonth() >= currentMonth;
  // });
  // const currentMonthCount = filteredData.length;
  // const futureCount = filteredData.length - currentMonthCount;

  return (
    <div>
      <div class="row">
        <h2 className=" text-center" style={{ marginTop: '40px' }}>
          Dashboard
        </h2>
        <div class="col-md-6 col-xl-4">
          <div class="card mb-3 widget-content bg-midnight-bloom">
            <div class="widget-content-wrapper ">
              <div class="widget-content-left">
                <div class="widget-heading">Total Consultation</div>
              </div>
              <div class="widget-content-right">
                <div class="widget-numbers ">
                  <span>{consultationValue}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-xl-4">
          <div class="card mb-3 widget-content bg-arielle-smile">
            <div class="widget-content-wrapper ">
              <div class="widget-content-left">
                <div class="widget-subheading">Disease</div>
              </div>
              <div class="widget-content-right">
                <div class="widget-numbers ">
                  <span>{diseaseValue}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-xl-4">
          <div class="card mb-3 widget-content bg-grow-early">
            <div class="widget-content-wrapper ">
              <div class="widget-content-left">
                <div class="widget-heading">Vaccination</div>
              </div>
              <div class="widget-content-right">
                <div class="widget-numbers ">
                  <span>{vaccinationValue}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-xl-4">
          <div class="card mb-3 widget-content bg-grow-early">
            <div class="widget-content-wrapper ">
              <div class="widget-content-left">
                <div class="widget-heading">Payment</div>
              </div>
              <div class="widget-content-right">
                <div class="widget-numbers ">
                  <span>{paymentValue}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {role === 'admin' ? (
        <div>
          <h2 className=" text-center" style={{ marginTop: '40px' }}>
            Consultation
          </h2>
          <Chart data={tripCounts} />
        </div>
      ) : null}
    </div>
  );
}

export default DashboardCounter;
