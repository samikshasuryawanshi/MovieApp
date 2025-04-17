export {removeTv} from "../reducers/tvSlice"
import axios from "../../utils/axios";
import { loadTv } from "../reducers/tvSlice";


export const asyncloadTv = (id) => async (dispatch,getState) => {
    try {
        const detail = await axios.get(`/tv/${id}`);
        const externalid = await axios.get(`/tv/${id}/external_ids`);
        const recommendations = await axios.get(`/tv/${id}/recommendations`);
        const similar = await axios.get(`/tv/${id}/similar`);
        const videos = await axios.get(`/tv/${id}/videos`);
        const watchproviders = await axios.get(`/tv/${id}/watch/providers`);
    

        let ultimatedetails={
            detail:detail.data,
            externalid:externalid.data,
            recommendations:recommendations.data.results,
            similar:similar.data.results,
            videos:videos.data.results.find(m => m.type === "Trailer"),
            watchproviders:watchproviders.data.results.IN,
               
        }


        dispatch(loadTv(ultimatedetails));
        // console.log(ultimatedetails);
        
    } catch (error) {
        console.error("Error loading tv:", error);
    }

}







