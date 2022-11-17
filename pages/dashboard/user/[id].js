import { useRouter } from "next/router";
import {remove} from "lib/utils";
import popup from "lib/popup";

export default function UserPage({ user }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      let res = await remove("/api/user/" + id);
      popup.alert("Success remove");
      router.push("/");
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
      <div className="p-6 bg-white dark:bg-gray-800">
        USER DATA
      </div> 
  );
}
