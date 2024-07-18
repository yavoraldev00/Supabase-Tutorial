import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import supabase from "../config/supabaseClient"

const Update = (  ) => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [method, setMethod] = useState("")
  const [rating, setRating] = useState("")
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!title || !method || !rating){
      setFormError("Fill out all fields")
    }

    const {data, error} = await supabase
      .from("smoothies")
      .update([{ title, method, rating }])
      .eq("id", id)
      .select()

     if (error){
       console.log(error);
       setFormError("Fill out all fields");
     }

    if(data){
      debugger;
      console.log(data);
      setFormError(null);
      navigate("/");
    }
  };

  useEffect(() => {
    const fetchSmoothie = async () => {
      const { data, error } = await supabase
        .from("smoothies")
        .select()
        .eq("id", id)
        .single()

        if(error){
          navigate("/", { replace: true })
        }
        if (data) {
          console.log(data)
          setTitle(data.title)
          setMethod(data.method)
          setRating(data.rating)
        }
    }

    fetchSmoothie();
  },[id, navigate])


  return (
    <div className="page update">
      <h2>Update</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input 
          type="text" 
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">Method:</label>
        <textarea 
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input 
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Create Smoothie Recipe</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Update