class ToDoListService {
  getToDoListApi() {
    return axios({
      url: "https://6385cb06beaa645826688fa9.mockapi.io/To-DoList",
      method: "GET",
    });
  }

  addToDoListApi(task) {
    return axios({
      url: "https://6385cb06beaa645826688fa9.mockapi.io/To-DoList",
      method: "POST",
      data: task,
    });
  }

  deleteToDoListApi(id) {
    return axios({
      url: `https://6385cb06beaa645826688fa9.mockapi.io/To-DoList/${id}`,
      method: "DELETE",
    });
  }

  changeStateToDoListApi(task) {
    return axios({
      url: `https://6385cb06beaa645826688fa9.mockapi.io/To-DoList/${task.id}`,
      method: "PUT",
      data: task,
    });
  }
}
export default ToDoListService;
