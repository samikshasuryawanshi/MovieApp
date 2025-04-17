export {removePeople} from "../reducers/peopleSlice"
import axios from "../../utils/axios";
import { loadPeople } from "../reducers/peopleSlice";


export const asyncloadPeople = (id) => async (dispatch,getState) => {
    try {
        const detail = await axios.get(`/person/${id}`);
        const externalid = await axios.get(`/person/${id}/external_ids`);
        const combineCredits = await axios.get(`/person/${id}/combined_credits`);
        const tvCredits = await axios.get(`/person/${id}/tv_credits`);
        const movieCredits = await axios.get(`/person/${id}/movie_credits`);
      
        let ultimatedetails={
            detail:detail.data,
            externalid:externalid.data,
            combineCredits:combineCredits.data,
            tvCredits:tvCredits.data,   
            movieCredits:movieCredits.data,
        }


        dispatch(loadPeople(ultimatedetails));
        // console.log(ultimatedetails);
        
    } catch (error) {
        console.error("Error loading people:", error);
    }

}







