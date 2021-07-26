import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";

function ExpenseItem(props) {
	return (
		<div>
			<Card className="expense-item">
				<ExpenseDate date={props.date} />
				<div className="expense-item__description">
					<h2>{props.title}</h2>
				</div>
				<div className="expense-item__price">${props.amount}</div>
				<button onClick={clickHandler}>Click me!</button>
			</Card>
		</div>
	);
}

export default ExpenseItem;
