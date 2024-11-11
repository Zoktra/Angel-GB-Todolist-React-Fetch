import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, } from "@fortawesome/free-solid-svg-icons";
//create your first component
const Home = () => {

	const [Usuario, setUsuario] = useState("AngelGB")
	const [imputValue, setImputValue] = useState("")
	const [todoList, setTodoList] = useState([])
	const [cargaTodoList, setCargaTodoList] = useState([])

	const postTodo = {
		label: imputValue,
		is_done: false
	}


	fetch(`https://playground.4geeks.com/todo/users/${Usuario}`)
		.then(response => {
			if (response.status === 404) {
				return fetch(`https://playground.4geeks.com/todo/users/${Usuario}`, {
					method: "POST"
				});
			}
		})
		.then(response => {
			if (response) {
				return response.json();
			}
		})
		.then(data => {
			if (data) {
				console.log("Usuario creado:", data);
			}
		})
		.catch(error => console.log(error));


	const cargarTareas = () => {
		fetch(`https://playground.4geeks.com/todo/users/${Usuario}`)
			.then(response => response.json())
			.then(response => setCargaTodoList(response.todos))
			.catch(error => console.log(error));
	};

	useEffect(() => {
		cargarTareas();
	}, []);

	const CrearTodo = () => {
		fetch("https://playground.4geeks.com/todo/todos/AngelGB", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(postTodo)
		})
			.then(response => response.json())
			.then(() => cargarTareas())
			.catch(error => console.log(error()))

	}

	const eliminarTodo = (id) => {
		fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: "DELETE",
		})
			.then(response => {
				if (response.ok) {
					cargarTareas();
				} else {
					console.log("Error al eliminar la tarea");
				}
			})
			.catch(error => console.log(error));
	};

	const limpiarTareas = () => {
		fetch(`https://playground.4geeks.com/todo/users/${Usuario}`, {
			method: "DELETE",
		})
			.then(response => {
				if (response.ok) {
					setCargaTodoList([]);
				} else {
					console.log("Error al eliminar todas las tareas");
				}
			})
			.catch(error => console.log(error));
	};

	return (
		<div>
			<div className="cabecero"><h1 className="text-center p-5">Todo List con Fetch</h1></div>
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
								cargaTodoList.length === 0 ? (
									<p className="text-center">¡No quedan tareas pendientes!</p>
								) :
									cargaTodoList.map((item, index) => {
										return (
											<h5 key={index} className="tareapendiente">
												<input className="form-check-input" type="checkbox" />
												- {item.label}
												<FontAwesomeIcon onClick={() => { eliminarTodo(item.id) }}
													className="eliminar float-end"
													icon={faTrash} />
											</h5>
										)
									})}
						</ul>
					</div>
					<div className="row p-5 d-flex justify-content-center">
						<p className="text-end">{cargaTodoList.length} tareas restantes </p>
						<button onClick={() => { limpiarTareas() }} className="col-3  btn btn-primary">Reiniciar lista</button>
					</div>
				</div>
			</div>
			<div className=" hoja hoja2 p-4">
				<div className="container input-group flex-nowrap p-3 ps-5">
					<span className="input-group-text" id="addon-wrapping">Introduce tareas</span>
					<input type="text" className="form-control" placeholder="Ejemplo programar 35 horas al dia"/>
				</div>
				<div>
					<div className="ps-3 container">
						<ul><h3 className="p-3 text-center">Tareas pendientes...</h3>
							{
								cargaTodoList.length === 0 ? (
									<p className="text-center">¡No quedan tareas pendientes!</p>
								) :
									cargaTodoList.map((item, index) => {
										return (
											<h5 key={index} className="tareapendiente">
												<input className="form-check-input" type="checkbox" />
												- {item.label}<FontAwesomeIcon className="eliminar float-end" icon={faTrash} />
											</h5>
										)
									})}
						</ul>
					</div>
					<div className="row p-5 d-flex justify-content-center">
						<p className="text-end">{cargaTodoList.length} tareas restantes </p>
						<button className="col-3  btn btn-primary">Reiniciar lista</button>
					</div>
				</div>
			</div>
			<div className=" hoja hoja1 p-4">
				<div className="container input-group flex-nowrap p-3 ps-5">
					<span className="input-group-text" id="addon-wrapping">Introduce tareas</span>
					<input type="text" className="form-control" placeholder="Ejemplo programar 35 horas al dia"/>
				</div>
				<div>
					<div className="ps-3 container">
						<ul><h3 className="p-3 text-center">Tareas pendientes...</h3>
							{
								cargaTodoList.length === 0 ? (
									<p className="text-center">¡No quedan tareas pendientes!</p>
								) :
									cargaTodoList.map((item, index) => {
										return (
											<h5 key={index} className="tareapendiente">
												<input className="form-check-input" type="checkbox" />
												- {item.label}<FontAwesomeIcon className="eliminar float-end" icon={faTrash} />
											</h5>
										)
									})}
						</ul>
					</div>
					<div className="row p-5 d-flex justify-content-center">
						<p className="text-end">{cargaTodoList.length} tareas restantes </p>
						<button className="col-3  btn btn-primary">Reiniciar lista</button>
					</div>
				</div>
			</div>

		</div>
	);
};

export default Home;