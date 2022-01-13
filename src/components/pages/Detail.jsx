import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { getProducts } from '../service/service'
import { store } from '../../index'
import { addToCart } from '../actions'

function Detail() {
    const [state, setState] = useState({product: {}})

    const { id } = useParams()

    useEffect(() => {
        getProducts.getProductById(id).then(response => setState({product: response.data}));
        const unsubscribe = store.subscribe(() => console.log(store.getState()));
        return () => {
            unsubscribe()
        }
    }, [])

    const { product } = state

    function addItemToCart(){
        store.dispatch(addToCart(product))
    }

    

    return (
        <div className='row mt-5 pt-5'>
            <div className="col-6">
                <img width='100%' src={product.pic} title={product.title} />
            </div>
            <div className="col-6">
                <h1>{product.title}</h1>
                <p>{product.desc}</p>
                <button onClick={addItemToCart} className='btn btn-primary'>Add to Cart</button>
            </div>
        </div>
    )
}

export default Detail
