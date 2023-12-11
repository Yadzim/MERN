import { FC, useEffect, useState } from "react"
import { FaTh, FaThLarge, FaThList } from "react-icons/fa";
import './style.scss'

const Shop: FC = (): JSX.Element => {
  const [products, setProducts] = useState<any[]>([]);
  const [layout, setLayout] = useState<string>("grid");

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then(response => response.json())
      .then(json => setProducts(json))
  }, [])

  return (
    <div className="shop-wrapper">
      <div className="header bg-card d-f">
        <h2 className="title"> Lorem ipsum dolor sit amet adipisicing elit?</h2>
      </div>
      <div className="categories-circle my-4">
        <div className="category bg-card"></div>
        <div className="category bg-card"></div>
        <div className="category bg-card"></div>
        <div className="category bg-card"></div>
        <div className="category bg-card"></div>
        <div className="category bg-card"></div>
        <div className="category bg-card"></div>
      </div>
      <div className="categories">
        <div className="category bg-card"><p className="category-name">Sumsung</p></div>
        <div className="category bg-card"><p className="category-name">Apple</p></div>
        <div className="category bg-card"><p className="category-name">Xiaomi</p></div>
        <div className="category bg-card"><p className="category-name">Huawie</p></div>
      </div>
      {/* <hr className="e-border" /> */}
      <div className="filter d-f mt-5">
        <input type="text" className="e-input" />
        <div className="filter-layout d-f">
          <button className={`e-btn ${layout==="grid"?"e-border":""}`} onClick={() => setLayout("grid")}><FaTh size={18} /></button>
          <button className={`e-btn ${layout==="grid-list"?"e-border":""} mx-2`} onClick={() => setLayout("grid-list")}><FaThLarge size={18} /></button>
          <button className={`e-btn ${layout==="list"?"e-border":""}`} onClick={() => setLayout("list")}><FaThList size={18} /></button>
        </div>
      </div>
      <hr className="e-border" />
      <div className={`products ${layout}`}>
        {
          products.map((element: any, i) => i < 20 && (
            <div className="product bg-card" key={i} >
              <img src={element?.thumbnailUrl} alt="" className="img" />
              <div className="product-info p-4">
                <p className="product-name">Product id: {element?.id}</p>
                <span className="product-description">{element?.title}</span>
              </div>
                {/* <button className="e-btn d-block w-h-100">Add card</button> */}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Shop

// https://www.figma.com/file/VoU4OU45mM6m2lVQuliwbM/Web-App-Design-with-Midjourney-in-Figma-(Community)?node-id=1838%3A14595&mode=dev