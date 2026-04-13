import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './create.css';
import Image from '../../assets/Image.png';
import { MOCK_ITEMS, CREATORS } from '../../data/mockData';
import { addNFT } from '../../firebase';

const Create = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    creatorName: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.creatorName) {
      alert("Please fill all required fields!");
      return;
    }

    const creator = CREATORS.find(c => c.name === formData.creatorName);
    if (!creator) {
      alert("Please select a valid creator from the dropdown.");
      return;
    }

    setIsSubmitting(true);

    let base64Image = Image; // Default image
    
    // Convert image to base64 for database persistence
    if (imageFile) {
      const reader = new FileReader();
      const loadPromise = new Promise((resolve) => {
          reader.onloadend = () => {
              resolve(reader.result);
          };
      });
      reader.readAsDataURL(imageFile);
      base64Image = await loadPromise;
    }

    const newItem = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.name,
      price: parseFloat(formData.price),
      likes: 0,
      image: base64Image,
      creator: creator
    };

    try {
      // Add a 10 second timeout to prevent hanging if the database isn't initialized
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Database connection timed out. Make sure your browser is refreshed, and check the Database Rules!")), 10000)
      );
      
      await Promise.race([addNFT(newItem), timeoutPromise]);
      alert("Item created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to create item: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='create section__padding'>
      <div className="create-container">
        <h1>Create new Item</h1>
        
        {imageFile && (
          <div className="upload-img-show" style={{marginBottom: "2rem"}}>
            <img src={URL.createObjectURL(imageFile)} alt="preview" style={{width: "200px", borderRadius: "10px"}} />
          </div>
        )}

        <form className='writeForm' autoComplete='off' onSubmit={handleSubmit}>
          
          <div className="formGroup">
            <label>Upload Image</label>
            <input type="file" className='custom-file-input' onChange={e => setImageFile(e.target.files[0])} accept="image/*" />
          </div>

          <div className="formGroup">
            <label>Name</label>
            <input type="text" placeholder='Item Name' value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} autoFocus={true} />
          </div>

          <div className="formGroup">
            <label>Creator</label>
            <input 
              list="creatorList" 
              placeholder='Select or Search Creator' 
              value={formData.creatorName}
              onChange={e => setFormData({...formData, creatorName: e.target.value})}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontFamily: 'var(--font-family)',
                fontSize: '18px',
                lineHeight: '27px',
                color: 'white',
                borderBottom: '1px solid gray'
              }}
            />
            <datalist id="creatorList">
              {CREATORS.map((c, index) => (
                <option key={index} value={c.name} />
              ))}
            </datalist>
          </div>

          <div className="formGroup">
            <label>Price</label>
            <div className="twoForm">
              <input type="number" step="0.01" placeholder='Price' value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
              <select>
                <option value="ETH">ETH</option>
              </select>
            </div>
          </div>

          <button className='writeButton' type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Item"}
          </button>
        </form>
      </div>
    </div>
  )
};

export default Create;
