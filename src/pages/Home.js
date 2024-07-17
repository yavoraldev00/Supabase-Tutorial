import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient"
import SmoothieCard from "../components/SmoothiesCard";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from("smoothies")
        .select()
        
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
  }, [])
  
  return (
    <div className="page home">
      <h2>Home</h2>
      {fetchError && ( 
        <div> No smoothies found </div>
       )}

      { smoothies && (
       <div className="smoothies">
         {/* order-by-buttons */}
         <div className="smoothie-grid">
           { smoothies.map((smoothie) => (
              <SmoothieCard key={smoothie.id} smoothie={smoothie} />
            // <p>{smoothie.title}</p>
           )) }
         </div>
       </div>
       )}
    </div>
  )
}

export default Home