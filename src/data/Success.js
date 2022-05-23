import "./style.css";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Success({ orderData }) {
	const navigate = useNavigate();
	return (
		<>
			<div className="success-title">Pedido feito com sucesso!</div>
			<div className="success-content">
				<div>
					<div className="success-subtitle">Filme e sessão</div>
					<span className="success-text">{orderData.movieData.title}</span>
					<span className="success-text">
						{orderData.movieData.date} {orderData.movieData.hours}
					</span>
				</div>
				<div>
					<div className="success-subtitle">Ingressos</div>
					<span className="success-text">
						{" "}
						{orderData.seatsData.map((seat) => (
							<div>Assento {seat.name}</div>
						))}
					</span>
				</div>
				<div>
					<div className="success-subtitle">Comprador</div>
					<span className="success-text">Nome: {orderData.buyerData.name}</span>
					<span className="success-text">CPF: {orderData.buyerData.cpf}</span>
				</div>

				<button className="success-button" onClick={() => navigate("/")}>
					Voltar pra Home
				</button>
			</div>
		</>
	);
}
