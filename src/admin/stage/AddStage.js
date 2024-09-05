import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoBusiness } from "react-icons/io5";
import { LuSubtitles } from "react-icons/lu";
import { MdOutlineDescription } from "react-icons/md";
import { MdOutlineInsertPhoto } from "react-icons/md";
import { MdNumbers } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
function AddStage() {
        
        const navigate = useNavigate();
        const [titre, setTitre] = useState("");
        const [description, setDescription] = useState("");
        const [img, setImgUrl] = useState("");
        const [imgUrl,setImg]=useState("");
        const [societe, setSociete] = useState("");
        const [ref, setRef] = useState("");
        const [loading, setLoading] = useState("");
        const [stageImage,setStageImage] = useState("");
        const[imagePreview , setImagePreview] = useState(null);
        const id =0;
       




        const handleImageChange = (e) =>{
            setStageImage(e.target.files[0])
            setImagePreview(URL.createObjectURL(e.target.files[0]))
       }
       
       const uploadImage = async (e) =>{
        e.preventDefault();
        setLoading(true)
        try{
          
            if (
              stageImage && (
                stageImage.type == "image/png" ||
                stageImage.type == "image/jpg" ||
                stageImage.type == "image/jpeg" 
              )
            )
            {
              const image = new FormData()
              image.append("file",stageImage)
              image.append("cloud_name","nmx3ilvz")
              image.append("upload_preset","nmx3ilvz")
              image.append("api_key","231595731546417")

              const response = await fetch(
                "https://api.cloudinary.com/v1_1/esps/image/upload",
              
              {
                method: "POST",
                body: image
              }

              )
              const imgData = await response.json();
              setImgUrl(imgData.url)
              setImagePreview(imgData.url)
              
              if (imgData.url)
              {
                alert("Upload Sucess")
                setImg(imgData.url)
              }
             
            }
            

        }
        catch (error)
        {
              setLoading(false);
        }

       }
       const handleSubmit =async (e) => {
        e.preventDefault();


        const response =await fetch(`http://localhost:5135/api/stage/add`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
            id,
            ref,
            societe,
            titre,
            description,
            imgUrl





        })
        
        
    });
    const content = await response.json();
    if(content)
    toast.success('Success');
    navigate('/admin/list');

    }


            return ( 
           
                <div className="container" style={{marginLeft:'8px'}}>
                     <p></p>
                <h2><IoIosAddCircleOutline />   Ajoutez Stage </h2>
                <form onSubmit={handleSubmit}>
               

            <div className="grid gap-3">
                     
            <div className="col-sm-5 p-2 g-col-6">
            <MdNumbers style={ {width:'30px' , height:'30px'}} /><input className="form-control"
                placeholder="Referance"
                type="text"
                value={ref}
                onChange={e => setRef(e.target.value)}
                />
            </div>



            <div className="col-sm-5 p-2 g-col-6">
            <IoBusiness style={ {width:'30px' , height:'30px'}} /><input className="form-control"
                placeholder="Société"
                type="text"
                value={societe}
                onChange={e => setSociete(e.target.value)}
                />
            </div>
            <div className="col-sm-5 p-2 g-col-6">
            <LuSubtitles style={ {width:'30px' , height:'30px'}}  />
  <input className="form-control"
                placeholder="Titre De Sujet"
                name="titre"
                type="text"
                value={titre}
                onChange={e => setTitre(e.target.value)}
                />
            </div>
            <div className="col-sm-5 p-2 g-col-6">
            <MdOutlineDescription  style={ {width:'30px' , height:'30px'}}/>
<textarea className="form-control"
                placeholder="description"
                name="description"
                type="text"
                value={description}
                onChange={e => setDescription(e.target.value)}
                />
            </div>
            <div className="col-sm-5 p-2 g-col-6">
            <MdOutlineInsertPhoto style={ {width:'30px' , height:'30px'}} />
            <div>{imagePreview ?<img src={imagePreview} alt="" width="500"/>:null}</div> 
            <input type="file" accept="image/png,image/jpeg" name="image" onChange={handleImageChange} />
            <button type='sumbit'  className="btn btn-dark" onClick={uploadImage}>
                    upload image
                  </button>
            </div>
           
        
            <div>
            <button className="btn btn-dark">Valider</button>
            <p></p>
            </div>  
            </div>
            </form>
        
        </div>

            



                );
        }

        export default AddStage;