import axios from "axios"

export async function getUserData(token: string | undefined) {
   let user: any
   await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/user-info`, {
      headers: {
         Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
      }
   })
   .then(function (res) {
      user = res.data
   })
   .catch(function (e) {
      user = false
      throw new Error('خطا در احراز هویت')
   })
   return user
}