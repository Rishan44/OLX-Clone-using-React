import React,{useEffect,useContext,useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import Heart from '../../assets/Heart';
import './Post.css';
import { PostContext } from '../../store/PostContext';
import { firestore } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';


function Posts() {
 
  const [products,setProducts] = useState([])
  const { setPostDetails } = useContext(PostContext)
  const navigate =useNavigate()
  useEffect(()=>{
    const fetchData = async ()=>{
      const querySnapshot = await getDocs(collection(firestore,'products'))
      const allPosts = querySnapshot.docs.map((doc)=>({
        ...doc.data(),
        id:doc.id
      }))
      setProducts(allPosts)
    }
    fetchData();
  },[])

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <Link to='/view'><div className="cards ">
        {products.map(pdt => {
            return(<div onClick={() =>{
              setPostDetails(pdt)
              navigate('/view')
              console.log(pdt)
            }}
          
            className="card"
            style={{textAlign: 'center'}}
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={pdt.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {pdt.price}</p>
              <span className="kilometer">{pdt.category}</span>
              <p className="name"> {pdt.name}</p>
            </div>
            <div className="date">
              <span style={{marginTop:'-7px'}}>{pdt.createdAt}</span>
            </div>
          </div>)
        })
          }
        </div> </Link>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className='d-flex'>
        {products.map(pdt=>{
          return <div className="cards">
          <div className="card" style={{textAlign:'center'}} >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={pdt.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {pdt.price}</p>
              <span className="kilometer">{pdt.category}</span>
              <p className="name"> {pdt.name}</p>
            </div>
            <div className="date">
              <span style={{marginTop:'-7px'}} >{pdt.createdAt}</span>
            </div>
          </div>
        </div>
        })
        }
      </div>
    </div>
    </div>
  );
}

export default Posts;
