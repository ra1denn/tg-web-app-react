import React, {useState} from 'react';
import './ProductList.css';
import ProductItem from '../ProductItem/ProductItem'
import { useTelegram } from '../../hooks/useTelegram';
import { useCallback, useEffect } from 'react';

const products = [
    {id: '1', title: 'товар 1', price: 200, description: 'крутой товар 1'},
    {id: '2', title: 'товар 2', price: 100, description: 'крутой товар 2'},
    {id: '3', title: 'товар 3', price: 300, description: 'крутой товар 3'},
    {id: '4', title: 'товар 4', price: 500, description: 'крутой товар 4'},
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg} = useTelegram();
    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItem = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: 'Купить ${getTotalPrice(newItems)}'
            })
        }
    }

    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                    product={item} 
                    onAdd={onAdd} 
                    className={'item'}
                />
            ))}

        </div>
    );
};

export default ProductList;