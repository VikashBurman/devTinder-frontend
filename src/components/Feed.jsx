import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import FeedCard from "./FeedCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((store)=>store.feed);
  // console.log(feedData);
  
  const fetchFeed = async () => {
    try {
      if(feedData){
        return;
      }
      const feed = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      // console.log(feed.data.users);
      dispatch(addFeed(feed.data.users));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchFeed();
  },[])
  return feedData &&  (
  <>
    <FeedCard user = {feedData[1]}/>
  </>
  );
};

export default Feed;
