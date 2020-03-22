import http from "../http-client";

class UserService {
    findAll() {
        return http.get('/user');
    }

    createUser(data) {
        return http.post('/user', data)
    }

    login(data) {
        return http.post('/user/login', data)
    }

    updateUser(id,data) {
        return http.put(`/user/${id}`,data)
    }

    deleteUser(id) {
        return http.delete(`/user/${id}`)
    }

    findByName(username) {
        return http.get(`/user?username=${username}`)
    }
}

export default new UserService();