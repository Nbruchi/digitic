import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getAllOrders,
  getAnnualOrders,
  getMonthlyOrders,
} from "../features/auth/authSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product Count",
    dataIndex: "product",
  },
  {
    title: "Product Price",
    dataIndex: "price",
  },
  {
    title: "Product Price (Discounted)",
    dataIndex: "discount",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const [orderData, setOrderData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [monthlyDataSales, setMonthlyDataSales] = useState([]);
  const monthlyDataState = useSelector((state) => state.auth?.monthlyData);
  const annualDataState = useSelector((state) => state.auth?.annualData);
  const orderState = useSelector((state) => state.auth?.allOrders);

  useEffect(() => {
    dispatch(getMonthlyOrders());
    dispatch(getAnnualOrders());
    dispatch(getAllOrders());
  }, [dispatch]);

  useEffect(() => {
    let monthNames = [
      "January",
      "February",
      "March",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let data = [];
    let monthlyOrderCount = [];
    for (let index = 0; index < monthlyDataState?.length; index++) {
      const element = monthlyDataState[index];
      data.push({
        type: monthNames[element?._id]?.month,
        income: element?.amount,
      });
      monthlyOrderCount.push({
        type: monthNames[element?._id]?.month,
        sales: element?.count,
      });
    }

    const tableData = [];
    for (let i = 0; i < orderState?.length; i++) {
      tableData.push({
        key: i,
        name:
          orderState[i]?.user?.firstname + " " + orderState[i]?.user?.lastname,
        product: orderState[i]?.orderItems?.length,
        price: orderState[i]?.totalPrice,
        discount: orderState[i]?.totalPriceAfterDiscount,
        status: orderState[i]?.orderStatus,
      });
    }

    setMonthlyData(data);
    setOrderData(tableData);
    setMonthlyDataSales(monthlyOrderCount);
  }, [monthlyDataState, orderState]);

  const config = {
    data: monthlyData,
    xField: "type",
    yField: "income",
    color: () => {
      return "#ffd333";
    },
    label: {
      position: "top",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      income: {
        alias: "Income",
      },
    },
  };

  const config2 = {
    data: monthlyDataSales,
    xField: "type",
    yField: "sales",
    color: () => {
      return "#ffd333";
    },
    label: {
      position: "top",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Sales",
      },
    },
  };

  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total Income</p>
            <h4 className="mb-0 sub-title">
              ${annualDataState ? annualDataState[0]?.amount : 0}
            </h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <p className="mb-0 desc">Income in last year from today</p>
          </div>
        </div>{" "}
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total Sales</p>
            <h4 className="mb-0 sub-title">
              {annualDataState ? annualDataState[0]?.count : 0}
            </h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <p className="mb-0 desc">Sales in last year from today</p>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between gap-3">
        <div className="mt-4 flex-grow-1 w-50">
          <h3 className="mb-5 title">Income Statistics</h3>
          <div>
            <Column {...config} />
          </div>
        </div>
        <div className="mt-4 flex-grow-1 w-50">
          <h3 className="mb-5 title">Sales Statistics</h3>
          <div>
            <Column {...config2} />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={orderData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
