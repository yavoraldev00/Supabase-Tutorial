import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient"
import SmoothieCard from "../components/SmoothiesCard";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);
  const [orderBy, setOrderBy] = useState("created_at");

  const handleDelete = (id) => {
    setSmoothies(prevSmoothies => {
      return prevSmoothies.filter(smoothie => smoothie.id !== id)
    })
  }

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from("smoothies")
        .select()
        .order(orderBy, {ascending: false})
        
      if (error) {
        setFetchError("Could not fetch smoothies");
        setSmoothies(null);
        console.log(error);
      }

      if (data) {
        setSmoothies(data);
        setFetchError(null);
      }
    }

    fetchSmoothies();
  }, [orderBy])
  
  return (
    <div className="page home">
      <h2>Home</h2>
      {fetchError && ( 
        <div> No smoothies found </div>
       )}

      { smoothies && (
       <div className="smoothies">
         <div className="order-by">
            <p>Order by:</p>
            <button onClick={() => setOrderBy('created_at')}>Time Created</button>
            <button onClick={() => setOrderBy('title')}>Title</button>
            <button onClick={() => setOrderBy('rating')}>Rating</button>
            {orderBy}
          </div>
         <div className="smoothie-grid">
           { smoothies.map((smoothie) => (
              <SmoothieCard key={smoothie.id} smoothie={smoothie} onDelete={handleDelete} />
            // <p>{smoothie.title}</p>
           )) }
         </div>
       </div>
       )}
    </div>
  )
}

export default Home