import { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { supabase } from "../../lib/supabase";

export function useComments(postID) {
  const [comments, setComments] = useState([]);
  const newComm = useRef("");
  const { user } = useUser();
  useEffect(() => {
    async function fechComments(postID) {
      const { data, error } = await supabase
        .from("comments")
        .select(`*, userinfo(profile_name, profile_pic)`)
        .eq(`post_id`, postID);
      if (error) return console.error("fech comment error", error);
      if (data.length > 0) {
        setComments(data);
      }
    }

    fechComments(postID);
  }, []);

  function handComment(id) {
    async function addNewComment() {
      const { data, err } = await supabase
        .from("comments")
        .insert({
          desc: newComm.current.value,
          post_id: postID,
          user_id: user?.id,
        })
        .select(`*, userinfo(profile_name, profile_pic)`);
      if (err) return console.log("add comment went wrong", err);
      if (data[0]) {
        setComments([data[0], ...comments]);
        newComm.current.value = "";
      }
    }
    async function deletComm(id) {
      const { data, err } = await supabase
        .from("comments")
        .delete()
        .eq("id", id);
      if (err) {
        return console.log("error with delet", err);
      } else {
        setComments(comments.filter((comment) => comment.id !== id));
      }
    }
    if (newComm) {
      addNewComment();
    } else deletComm(id);
  }
  return { comments, newComm, handComment };
}
