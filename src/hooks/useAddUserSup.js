import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";

// Save user information to Supabase
const useAddUserSup = () => {
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();
  useEffect(() => {
    if (user) saveUserToSupabase(user);
  }, [user]);

  const saveUserToSupabase = async (clerkUser) => {
    const { id, emailAddresses, fullName, username } = clerkUser;

    const { error } = await supabase.from("userinfo").upsert({
      id: id,
      email: emailAddresses[0]?.emailAddress,
      profile_name: fullName,
      user_name: username,
      profile_pic: user.imageUrl,
    });
    if (error) {
      console.error("Error saving user to Supabase:", error);
    } else {
      console.log("User saved to Supabase successfully!");
      if (isSignedIn) navigate("/home");
    }
  };
};

export default useAddUserSup;
