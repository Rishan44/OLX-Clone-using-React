import React, { Fragment,useState,useContext } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { collection, addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
import { firestore, firebaseApp } from '../../firebase/config'
import { authContext } from '../../store/Context';

const Create = () => {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('') 
  const [nameError,setNameError] = useState('')
  const [categoryError, setCategoryError] = useState('')
  const [priceError, setPriceError] = useState('')
  const [imageError, setImageError] = useState('')
  const [authError, setAuthError] = useState('')


  const storage = getStorage(firebaseApp)
  const navigate = useNavigate()
  const {user} = useContext(authContext)
  const date = new Date()
  const handleSubmit = async (e)=>{
    e.preventDefault();
    setNameError('')
    setCategoryError('')
    setPriceError('')
    setImageError('')
    setAuthError('')
    
    if (!user || !user.uid) {
      setAuthError('User is not authenticated or does not have a valid UID.');
      return;
    }

    let hasErrors = false;

    if (!name) {
      setNameError('Name is required.');
      hasErrors = true;
    }
    if (!category) {
      setCategoryError('Category is required.');
      hasErrors = true;
    }
    if (!price) {
      setPriceError('Price is required.');
      hasErrors = true;
    } else if (isNaN(price) || parseFloat(price) <= 0) {
      setPriceError('Price must be a valid number greater than zero.');
      hasErrors = true;
    }
    if (!image) {
      setImageError('Image is required.');
      hasErrors = true;
    }

  if(!hasErrors){
    try{
      const storageRef = ref( storage,`/image/${image.name}`)
      const uploadTaskSnapshot = await uploadBytes(storageRef, image)
      const downloadUrl = await getDownloadURL(uploadTaskSnapshot.ref)
      
      const productRef = collection(firestore, 'products')
      await addDoc(productRef,{
        name,
        category,
        url:downloadUrl,
        price,
        userId:user.uid,
        createdAt: date.toDateString(),
      }).then(()=>{
        setName('')
        setCategory('')
        setPrice('')
        setImage('')
        navigate('/')
      })
    } catch(error){
      console.error('Error:',error);
    }
  }
}

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv" mt-5>
        {authError && <div className="error-message">{authError}</div>}
         
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              id="fname"
              onChange={(e)=>{setName(e.target.value)
              setAuthError('')
              setNameError('')
              }}
              name="Name"
            
            />
            <div className="error-message text-danger">{nameError}</div>
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              id="fname"
              onChange={(e)=>{setCategory(e.target.value)
                setAuthError('')
                setCategoryError('')
              }}
              name="category"
             
            />
            <div className="error-message text-danger">{categoryError}</div>
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input 
            className="input" 
            type="number" 
            value={price} 
            onChange={(e)=>{
            setPrice(e.target.value)
            setAuthError('')
            setPriceError('')
            }}
            id="fname" 
            name="Price" />
            <div className="error-message text-danger">{priceError}</div>
            <br />
    
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) :'https://store-images.s-microsoft.com/image/apps.7709.107cee2a-5fd3-4415-b8b8-6c4fc3543b6f.efb6605e-7773-4c0f-b897-6eeb2b35ca5f.be52dc3b-b8a8-4bb0-b5fe-cc532868348b.png'}></img>
         
            <br />
            <input onChange={(e)=>{
              setImage(e.target.files[0])
              setAuthError('')
              setImageError('')
            }} type="file" />
            <div className="error-message text-danger">{imageError}</div>
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>

        </div>
      </card>
    </Fragment>
  );
};

export default Create;
