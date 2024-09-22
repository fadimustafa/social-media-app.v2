import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { supabase } from "../../lib/supabase";

function useLikes(type, ID) {
  const [isLiked, setIsLike] = useState(false);
  const [likesCunt, setLikesCunt] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (type === "posts") {
      async function postLikes() {
        const { data, error } = await supabase
          .from("likes")
          .select(`*,userinfo(profile_name, profile_pic)`)
          .eq("post_id", ID);
        if (error) return console.error("error feching like cunte", error);
        if (data.length > 0) {
          setLikesCunt(data);
          const checkLike = data.filter((like) => like.user_id == user?.id);
          if (checkLike.length > 0) setIsLike(true);
        } else setLikesCunt([]);
      }
      postLikes();
    } else {
      async function commentLikes() {
        const { data, error } = await supabase
          .from("commlikes")
          .select(`*, userinfo(profile_name, profile_pic)`)
          .eq("comm_id", ID);
        if (error) return console.error("commLikeCun err", error);
        if (data.length > 0) {
          setLikesCunt(data);
          const checkLike = data.filter((like) => like.user_id == user?.id);
          if (checkLike.length > 0) setIsLike(true);
        }
      }
      commentLikes();
    }
  }, []);
  const hanPostLike = async () => {
    const incrmantLikes = async () => {
      const { data, error } = await supabase
        .from("likes")
        .insert({
          post_id: ID,
          user_id: user.id,
        })
        .select();
      if (error) console.error("Error incrementing like count:", error);
      else {
        setLikesCunt([...likesCunt, data[0]]);
        setIsLike(true);
      }
    };
    const decrmantLikes = async () => {
      const { data, error } = await supabase
        .from("likes")
        .delete()
        .match({ user_id: user?.id, post_id: ID })
        .select();

      if (error) console.error("Error decrementing like count:", error);
      else {
        setLikesCunt(likesCunt.filter((likes) => likes.id !== data[0].id));
        setIsLike(false);
      }
    };
    if (isLiked) {
      decrmantLikes();
    } else {
      incrmantLikes();
    }
  };
  function hanCommLike() {
    async function addCommLike() {
      const { data, error } = await supabase
        .from("commlikes")
        .insert({
          user_id: user?.id,
          comm_id: ID,
        })
        .select();
      if (error) {
        return console.error("addCommLike err", error);
      } else {
        setIsLike(true);
        setLikesCunt([...likesCunt, data[0]]);
      }
    }
    async function deleCommLike() {
      const { data, error } = await supabase
        .from("commlikes")
        .delete()
        .eq("user_id", user?.id);
      if (error) {
        return console.error("deleCommLike err", error);
      } else {
        setIsLike(false);
        setLikesCunt(likesCunt.filter((likes) => likes.id !== data[0].id));
      }
    }
    if (isLiked) {
      deleCommLike();
    } else {
      addCommLike();
    }
  }
  return { hanCommLike, hanPostLike, isLiked, likesCunt };
}

export default useLikes;
