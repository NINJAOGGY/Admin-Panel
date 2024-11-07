import React from 'react';
import logo from '../../assets/logo.png';
import { groupNumber, ordersData } from '../../data';
import css from './Orders.module.css';
import OrdersPieChart from '../OrdersPieChart/OrdersPieChart';

const Orders = () => {
    return (
        <div className={`${css.container} theme-container`}>
            <div className={css.head}>
                <img src={logo} alt="" />
                <span>Orders today</span>
            </div>

            <div className={`${css.stat} grey-container`}>
                <span>Amount</span>
                <span>$ {groupNumber(4560)}</span>
            </div>

            <div className={css.orders}>
                {
                    ordersData.map((order,index)=>(
                        <div key={index} className={css.order}>
                            <div>
                                <span>{order.name}</span>
                                <span>$ {order.change}</span>
                            </div>
                            <div>
                                <span>{order.type}</span>
                                <span>Items: {order.items}</span>
                            </div>
                        </div>
                    ))
                }
            </div>

            {/* donut chart */}
            <div className={css.orderChart}>
                <span>
                    Split by Orders
                </span>
                <OrdersPieChart/>
            </div>
        </div>
    )
}

export default Orders