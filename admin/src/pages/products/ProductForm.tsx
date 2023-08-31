import { Button, TextField } from '@mui/material'
import axios from 'axios';
import Layout from 'components/Layout'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';

const ProductForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState(0);
    const [redirect, setRedirect] = useState(false);
    const { id } = useParams()

    useEffect(() => {
        if (id) {
            (
                async () => {
                    const { data } = await axios.get(`/products/${id}`)

                    setTitle(data.title);
                    setDescription(data.description);
                    setImage(data.image);
                    setPrice(data.price);
                }
            )()
        }
    }, [])

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const data = {
            title,
            description,
            image,
            price
        }

        if (id) {
            await axios.put(`/products/${id}`, data)
        } else {
            await axios.post('/products', data)
        }

        setRedirect(true)
    }

    if (redirect) {
        return <Navigate to='/products' />
    }

    return (
        <Layout>
            <form onSubmit={submit}>
                <div className='mb-3'>
                    <TextField label="Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)} />
                </div>
                <div className='mb-3'>
                    <TextField label="Description" rows={4} multiline
                        value={description}
                        onChange={e => setDescription(e.target.value)} />
                </div>
                <div className='mb-3'>
                    <TextField label="Image"
                        value={image}
                        onChange={e => setImage(e.target.value)} />
                </div>
                <div className='mb-3'>
                    <TextField label="Price" type='number'
                        value={price}
                        onChange={e => setPrice(parseFloat(e.target.value))} />
                </div>
                <Button type='submit' variant='contained' color='primary'>Submit</Button>
            </form>
        </Layout>
    )
}

export default ProductForm