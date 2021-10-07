import axios from "axios";

const oauth = `Bearer ${document.location.hash.substring(14, 44)}`;
const clientId = process.env.REACT_APP_CLIENT_ID;

export default axios.create({
  baseURL: "https://api.twitch.tv/helix",
  headers: {
    Authorization: oauth,
    "Client-ID": clientId,
  },
});
