import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, } from "@fortawesome/free-solid-svg-icons";
//create your first component
const Home = () => {

	const [imputValue, setImputValue] = useState("")
	const [todoList, setTodoList] = useState([])

	const post = {
		label: imputValue,
		is_done: false
	  }
	useEffect(() => {
		fetch("https://playground.4geeks.com/todo/users/AngelGB")
			.then(response => response.json())
			.then(response => setTodoList(response.todos))
			.catch(error => console.log(error()));

	}, [imputValue, eliminarTodo])
	console.log(todoList);
	
	const CrearTodo = () => {
		fetch("https://playground.4geeks.com/todo/todos/AngelGB", {
			method: "POST",
			headers: {"Content-Type":"application/json"},
			body: JSON.stringify(post)
		})
		.then(response => response.json())
		.then(response => console.log(response))
		.catch(error => console.log(error()))
	
	}

	const eliminarTodo = (id) => {
		fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: "DELETE",
		})
		.then(response => response.json())
		.then(response => console.log(response))
		.catch(error => console.log(error));
	};
console.log("obj de label",);

	return (
		<div>
			<div className="cabecero"><h1 className="text-center p-5">Todo List</h1></div>
			<div className=" hoja hoja3 p-4">
				<div className="container input-group flex-nowrap p-3 ps-5">
					<span className="input-group-text" id="addon-wrapping">Introduce tareas</span>
					<input type="text" className="form-control" placeholder="Ejemplo programar 35 horas al dia"
						onChange={(e) => {
							setImputValue(e.target.value);
						}}
						value={imputValue}
						onKeyUp={(e) => {
							if (e.key === "Enter" && imputValue !== "") {
								setTodoList([imputValue])
								setImputValue("")
								CrearTodo()
							}
						}}
					/>
				</div>
				<div>
					<div className="ps-3 container">
						<ul><h3 className="p-3 text-center">Tareas pendientes...</h3>
							{
								todoList.length === 0 ? (
									<p className="text-center">¡No quedan tareas pendientes! <img src="https://media.tenor.com/12vvBX1HaPUAAAAi/dance.gif" alt="" /> </p>
								) :
									todoList.map((item, index) => {
										return (
											<h5 key={index} className="tareapendiente">
												<input className="form-check-input" type="checkbox" />
												- {item.label}
												<FontAwesomeIcon onClick={() => {eliminarTodo(item.id)}}
													className="eliminar float-end"
													icon={faTrash} />
											</h5>
										)
									})}
						</ul>
					</div>
					<div className="container text-end">
						<p>{todoList.length} tareas restantes </p>
					</div>
				</div>

			</div>
			{/* <div className="hoja hoja2 p-4">
				<div className="container input-group flex-nowrap p-3 ps-5">
					<span className="input-group-text" id="addon-wrapping">Introduce tareas</span>
					<input type="text" className="form-control" placeholder="Ejemplo programar 35 horas al dia" />
				</div>
				<div>
					<div className="ps-3 container">
						<ul><h3 className="p-3 text-center">Tareas pendientes...</h3>
							{
								todoList.length === 0 ? (
									<p className="text-center">¡No quedan tareas pendientes! <img src="https://media.tenor.com/12vvBX1HaPUAAAAi/dance.gif" alt="" /> </p>
								) :
									todoList.map((item, index) => {
										return (
											<h5 key={index}><FontAwesomeIcon
												icon={faTrash} /> - {item}  </h5>
										)
									})}h5
						</ul>
					</div>
					<div className="container text-end">
						<p>tareas restantes </p>
					</div>
				</div>
			</div>
			<div className="hoja hoja1 p-4">
				<div className="container input-group flex-nowrap p-3 ps-5">
					<span className="input-group-text" id="addon-wrapping">Introduce tareas</span>
					<input type="text" className="form-control" placeholder="Ejemplo programar 35 horas al dia" />
				</div>
				<div>
					<div className="ps-3 container">
						<ul><h3 className="p-3 text-center">Tareas pendientes...</h3>
							{
								todoList.length === 0 ? (
									<p className="text-center">¡No quedan tareas pendientes! <img src="https://media.tenor.com/12vvBX1HaPUAAAAi/dance.gif" alt="" /> </p>
								) :
									todoList.map((item, index) => {
										return (
											<h5 key={index}><FontAwesomeIcon
												icon={faTrash} /> - {item}  </h5>
										)
									})}
						</ul>
					</div>
					<div className="container text-end">
						<p>tareas restantes </p>
					</div>
				</div>
			</div> */}
		</div>
	);
};

export default Home;