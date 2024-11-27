import React, { useEffect, useState } from "react";
import './css/admin.css';
import { updatePrice, getPrice } from '../../action/settings';

const Weight = () => {
    const [price, setPrice] = useState('');
    const [currency, setCurrency] = useState('');
    const [priceMongo, setPriceMongo] = useState({});
   
    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const allSettings = await getPrice();
            setPriceMongo(allSettings || {});
        } catch (error) {
            console.error('Ошибка при получении данных о цене:', error);
        }
    };


    useEffect(() => {
        console.log(priceMongo);
    }, [priceMongo]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (price !== '' && currency !== '') {
                await updatePrice(price, currency);
                alert('Данные успешно сохранены');
                setPrice('');
                setCurrency('');
                fetchSettings();
            } else {
                alert('Все поля пустые');
            }
        } catch (error) {
            alert('Ошибка при сохранении данных');
        }
    };

   
    const handleCurrencyChange = (selectedCurrency) => {
        setCurrency(selectedCurrency);
    };

    return (
        <div className="status-list">
            <h1 className="status-list-title">Цена за кг</h1>
            <form className="form-filialAdd" onSubmit={handleSubmit}>
                <div className="inputs-wrapper-price">
                    <input
                        className="input-filialAdd"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder=""
                    />
                    <div className="miniButton-container">
                        <div
                            className={`miniButton ${currency === 'tenge' ? 'miniButton-active' : ''}`}
                            onClick={() => handleCurrencyChange('tenge')}
                        >
                            ₸
                        </div>
                       
                    </div>
                    <p className="priceCurrency">
                        {priceMongo.price ? `${priceMongo.price}${priceMongo.currency === 'dollar' ? '$' : '₸'}` : ''}
                    </p>
                </div>
                <button className="filialAdd-button" type="submit">Сохранить</button>
            </form>

           
        </div>
    );
}

export default Weight;
