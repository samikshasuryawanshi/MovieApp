import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers:{
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NjZhNDM5ZmJhM2RhNGZjNDAwMjZmNDRjOWY0YjhiZCIsIm5iZiI6MTc0NDMxNTExMS45NTYsInN1YiI6IjY3ZjgyMmU3ZDNhYjdkN2E4YmFkNjY5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B1sg3jIlNaZKzxzakOFOmMbPDEu-aAZZyh-pP4KgOWk"
    }
});

export default instance;

