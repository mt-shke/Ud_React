## 1- Component-Driven User Interfaces

- React Core Syntax & JSX

## 2 - User Interaction & State

- Re-usable and reactive components
- Handling Events -> update UI & working with "State"

## 3 - Rendering Lists & Conditionnal Content

- Outputting Dynamic lists of content
- Rendering content under certain conditions

## 4 - Styling Components

<details>
	<summary>Conditional & Dynamic Styles </summary>  
  
```js	
<label style={{ color: !isValid ? 'red' : 'black' }}>Course Goal</label>
        <input
          style={{
            borderColor: !isValid ? 'red' : '#ccc',
            background: !isValid ? 'salmon' : 'transparent'
          }}
          type="text"
          onChange={goalInputChangeHandler}
        />
	
```  
</details>

<details>
	<summary>Styled Components</summary>  
  
```js	
// npm install --save styled-components
import styled from 'styled-components';

const Button = styled.button` font: inherit; padding: 0.5rem 1.5rem; border: 1px solid #8b005d; color: white; background: #8b005d; box-shadow: 0 0 4px rgba(0, 0, 0, 0.26); cursor: pointer; &:focus { outline: none; } &:hover, &:active { background: #ac0e77; border-color: #ac0e77; box-shadow: 0 0 8px rgba(0, 0, 0, 0.26); }`;

````
</details>

<details>
	<summary>CSS Modules </summary>

```js
import styles from './CourseInput.module.css';

  <div className={`${styles['form-control']} ${!isValid && styles.invalid}`}>

````

</details>  
	
	
## 5 - Debugging 
- Understanding Error Messages
- Working with Breakpoints
- Using React DevTools

## 6 - Fragments, Portals, Refs

<details>
	<summary>Jsx Limitations & Fragments </summary>  
  
```js	
Const Wrapper = (props) => {
	return <div className='wrapper'>{props.children}<div>
	
	//
	return <React.Fragment>{props.children}<React.Fragment />
	//
	return <Fragment>{props.children}<Fragment />
	//
	return <>{props.children}</>
	
	// Should always return in one element
	
```  
</details>

<details>
	<summary>Cleaner Dom with Portals </summary>  
  
```js	
import ReactDOM from "react-dom";

const ModalOverlay = (props) => {
return <div className={styles.backdrop}></div>;
};

const ModalForm = (props) => {
return <div className={styles.modal}>Modal</div>;
};

const Modal = (props) => {
return (
<Fragment>
{props.form && ReactDOM.createPortal(<ModalOverlay />, document.getElementById("overlay"))}
{props.form && ReactDOM.createPortal(<ModalForm />, document.getElementById("modal"))}
</Fragment>
);
};
export default Modal;

````
</details>


<details>
	<summary>Refs </summary>

```js

	const inputNameRef= useRef(); ref={inputNameRef}
	const enteredName = inputNameRef.current.value;
	<input ref={inputNameRef} />

	// useRef -> uncontrolledComponent(using DOM by Ref) | useState -> controlledComponent(use props and callbackFunc like onChange)

````

</details>

## 7 - Effects, Reducers & Context

<details>
	<summary>Effects & Side Effects  </summary>  
  
```js
	useEffect(() => {  
		const identifier = setTimeout(() => {  
			console.log("Checking form validity!");  
			setFormIsValid(enteredEmail.includes("@") && enteredPassword.trim().length > 6);  
		}, 1000);  
		return () => {  
			console.log("Clean up");  
			clearTimeout(identifier);  
		};  
	}, [enteredEmail, enteredPassword]);  
```  
	
</details>

<details>
	<summary>Managing Complex States with Reducers </summary>  
  
```js
	const emailReducer = (state, action) => {  
		if (action.type === "USER_INPUT") {  
			return { value: action.val, isValid: action.val.includes("@") };  
		}  
		if (action.type === "INPUT_BLUR") {  
			return { value: state.value, isValid: state.value.includes("@") };  
		}  
		return { value: "", isValid: false };  
	};

    const [emailState, dispatchEmail] = useReducer(emailReducer, { value: "", isValid: undefined });

    const { isValid: emailIsValid } = emailState;

useEffect(() => {
const identifier = setTimeout(() => {
console.log("running");
setFormIsValid(emailIsValid && passwordIsValid);
}, 1000);
return () => {
console.log("ends");
clearTimeout(identifier);
};
}, [emailIsValid, passwordIsValid]);

    const emailChangeHandler = (event) => {
    	dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    };

    const validateEmailHandler = () => {
    	dispatchEmail({ type: "INPUT_BLUR" });
    };

    return (<input type="email" id="email"  value={emailState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler}

````
</details>


<details>
	<summary>Managing App/Component-wide with Context & imperativeHandle with useRef  </summary>

```js
const AuthContext = React.createContext({
	isLoggedIn: false,
	onLogout: () => {},
	onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");
		if (storedUserLoggedInInformation === "1") setIsLoggedIn(true);
	}, []);

	const logoutHandler = () => {
		localStorage.removeItem("isLoggedIn");
		setIsLoggedIn(false);
	};
	const logintHandler = () => {
		localStorage.setItem("isLoggedIn", "1");
		setIsLoggedIn(true);
	};

	return (
		<AuthContext.Provider value={{ isLoggedIn: isLoggedIn, onLogout: logoutHandler, onLogin: logintHandler }}>
			{props.children}
		</AuthContext.Provider>
	);
};
````

```js
// ImperativeHandle / useRef to call method from parent element via ref
	// Parent Component
	const inputDataRef = useRef();
	const addItem = (e) => {
		e.preventDefault();
		inputDataRef.current.addOne();
	};

	return (
		<form className={styles.form}>
			<Input ref={inputDataRef} />
			<button onClick={addItem}>+ Add</button>
		</form>
	);

	// Child Component
const Input = React.forwardRef((props, ref) => {
	const inputRef = useRef();

	const activate = () => {
		console.log("focus");
		inputRef.current.focus();
	};

	const returnVal = () => {
		return inputRef.current.value;
	};

	const addOneMore = () => {
		inputRef.current.value++;
		console.log(inputRef.current.value);
	};

	useImperativeHandle(ref, () => {
		return { focus: activate, valReturn: returnVal, addOne: addOneMore };
	});

	return (
		<div className={styles.input}>
			<label>Amount</label>
			<input  ref={inputRef} type="number"></input>
```

</details>

## 8 - useMemo()

## 9 - Class Components

<details>
	<summary> Class Component </summary>

```js
class Users extends Component {
	constructor() {
		super();
		this.state = {
			showUsers: true,
			moreState: "Test",
		};
	}

	toggleUsersHandler() {
		// this.state.showUsers = false; Not the way
		this.setState((curState) => {
			return { showUsers: !curState.showUsers };
		});
	}

	render() {
		const usersList = (
			<ul>
				{DUMMY_USERS.map((user) => (
					<User key={user.id} name={user.name} />
				))}
			</ul>
		);

		return (
			<div className={classes.users}>
				<button onClick={this.toggleUsersHandler.bind(this)}>
					{this.state.showUsers ? "Hide" : "Show"} Users
				</button>
				{this.state.showUsers && usersList}
			</div>
		);
	}

```

</details>  
  
<details>  
  <summary> componentDidMount(), componentDidUpdate(), componentWillUnmount() </summary>

```js
// Using Class based component methods
class UserFinder extends Component {
	constructor() {
		super();
		this.state = {
			filteredUser: [],
			searchTerm: "",
		};
	}

	componentDidMount() {
		// Send http request...
		this.setState({ filteredUsers: DUMMY_USERS });
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.searchTerm !== this.state.searchTerm) {
			this.setState({
				filteredUsers: DUMMY_USERS.filter((user) => user.name.includes(this.state.searchTerm)),
			});
		}
	}

	searchChangeHandler(event) {
		this.setState({ searchTerm: event.target.value });
	}

	render() {
		return (
			<Fragment>
				<div className={styles.finder}>
					<input type="search" onChange={this.searchChangeHandler.bind(this)} />
				</div>
				<Users users={this.state.filteredUsers} />
			</Fragment>
		);
	}
}

// Using Hooks
// const UserFinder = () => {
// 	const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
// 	const [searchTerm, setSearchTerm] = useState("");

// 	useEffect(() => {
// 		setFilteredUsers(DUMMY_USERS.filter((user) => user.name.includes(searchTerm)));
// 	}, [searchTerm]);

// 	const searchChangeHandler = (event) => {
// 		setSearchTerm(event.target.value);
// 	};

// 	return (
// 		<Fragment>
// 			<div className={styles.finder}>
// 				<input type="search" onChange={searchChangeHandler} />
// 			</div>
// 			<Users users={filteredUsers} />
// 		</Fragment>
// 	);
// };
```

```js
class User extends Component {
	componentWillUnmount() {
		console.log("user will unmount");
	}

	render() {
		return <li className={classes.user}>{this.props.name}</li>;
	}
}
```

</details>

<details>

<summary>Static ContextType </summary>

```js
// In app.js
const DUMMY_USERS = [
	{ id: "u1", name: "Max" },
	{ id: "u2", name: "Manuel" },
	{ id: "u3", name: "Julie" },
];

function App() {
	const usersContext = {
		users: DUMMY_USERS,
	};

	return (
		<UsersContext.Provider value={usersContext}>
			<UserFinder />
		</UsersContext.Provider>
	);
}
```

```js
// In UserFinder.js
class UserFinder extends Component {
	static contextType = UsersContext;

	constructor() {
		super();
		this.state = {
			filteredUsers: [],
			searchTerm: "",
		};
	}

	componentDidMount() {
		// Send http request...
		this.setState({ filteredUsers: this.context.users });
	}

```

</details>

</details>

<details>  
<summary>Error Boundaries </summary>

```js
class ErrorBoundary extends Component {
	constructor() {
		super();
		this.state = {
			hasError: false,
		};
	}

	componentDidCatch() {
		this.setState({ hasError: true });
	}

	render() {
		if (this.state.hasError) {
			return <p>Something went wrong!</p>;
		}
		return this.props.children;
	}
}
```

```js
// In child component

	componentDidUpdate() {
		// try {
		// 	failCode()
		// } catch (err) {
		// 	console.log(err.message);
		// }
		if (this.props.users.length === 0) {
			throw new Error("Custom Error! No users provided!");
		}
	}
```

</details>

## 10 - Backend & Database

<details>  
<summary>Working with backend and database</summary>

```js
function App() {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchMoviesHandler = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(
				"https://react-app-29bac-default-rtdb.europe-west1.firebasedatabase.app/movies.json"
			);
			if (!response.ok) {
				throw new Error("Something went wrong!");
			}

			const data = await response.json();
			console.log(data);
			const loadedMovies = [];

			for (const key in data) {
				loadedMovies.push({
					id: key,
					title: data[key].title,
					openingText: data[key].openingText,
					releaseDate: data[key].releaseDate,
				});
			}

			const transformedMovies = loadedMovies.map((movieData) => {
				return {
					id: movieData.episode_id,
					title: movieData.title,
					openingText: movieData.opening_crawl,
					releaseDate: movieData.release_date,
				};
			});
			setMovies(transformedMovies);
		} catch (error) {
			setError(error.message);
		}
		setIsLoading(false);
	}, []);

	useEffect(() => {
		fetchMoviesHandler();
	}, [fetchMoviesHandler]);

	async function addMovieHandler(movie) {
		const response = await fetch(
			"https://react-app-29bac-default-rtdb.europe-west1.firebasedatabase.app/movies.json",
			{
				method: "POST",
				body: JSON.stringify(movie),
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const data = await response.json();
		console.log(data);
	}

	let content = <p>Found no movies.</p>;

	if (movies.length > 0) {
		content = <MoviesList movies={movies} />;
	}

	if (error) {
		content = <p>{error}</p>;
	}

	if (isLoading) {
		content = <p>Loading...</p>;
	}

	return (
		<React.Fragment>
			<section>
				<AddMovie onAddMovie={addMovieHandler} />
			</section>
			<section>
				<button onClick={fetchMoviesHandler}>Fetch Movies</button>
			</section>
			<section>{content}</section>
		</React.Fragment>
	);
}
```

</details>

## 11 - Custom Hooks

<details>
<summary>useSynthax</summary>

```js
const useCounter = (forwards = true) => {
	const [counter, setCounter] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			if (forwards) {
				setCounter((prevCounter) => prevCounter + 1);
			} else {
				setCounter((prevCounter) => prevCounter - 1);
			}
		}, 1000);
		return () => clearInterval(interval);
	}, [forwards]);
	return counter;
};
export default useCounter;
```

```js
import useCounter from "./hooks/use-counter";
const BackwardCounter = () => {
	const counter = useCounter(false);

	return <Card>{counter}</Card>;
};
```

</details>

<details>
<summary>customHooks</summary>

```js
const useHttp = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const sendRequest = useCallback(async (requestConfig, applyData) => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(requestConfig.url, {
				method: requestConfig.method ? requestConfig.method : "GET",
				headers: requestConfig.headers ? requestConfig.headers : {},
				body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
			});

			if (!response.ok) {
				throw new Error("Request failed!");
			}

			const data = await response.json();
			applyData(data);
		} catch (err) {
			setError(err.message || "Something went wrong!");
		}
		setIsLoading(false);
	}, []);

	return {
		isLoading,
		error,
		sendRequest,
	};
};
```

```js
function App() {
	const [tasks, setTasks] = useState([]);

	const { isLoading, error, sendRequest: fetchTasks } = useHttp();
	useEffect(() => {
		const transformTasks = (taskObj) => {
			const loadedTasks = [];
			for (const taskKey in taskObj) {
				loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
			}
			setTasks(loadedTasks);
		};

		fetchTasks(
			{ url: "https://react-app-29bac-default-rtdb.europe-west1.firebasedatabase.app/tasks.json" },
			transformTasks
		);
	}, [fetchTasks]);

	const taskAddHandler = (task) => {
		setTasks((prevTasks) => prevTasks.concat(task));
	};

	return (
		<React.Fragment>
			<NewTask onAddTask={taskAddHandler} />
			<Tasks items={tasks} loading={isLoading} error={error} onFetch={fetchTasks} />
		</React.Fragment>
	);
}
```

</details>

<details>

<summary>customHooks</summary>
</details>

## 12 - Form & Input

<details>
<summary>With custom input hook</summary>

useInput hook

```js
const useInput = (validateValue) => {
	const [enteredValue, setEnteredValue] = useState("");
	const [isTouched, setIsTouched] = useState(false);

	const valueIsValid = validateValue(enteredValue);
	const hasError = !valueIsValid && isTouched;

	const valueChangeHandler = (event) => {
		setEnteredValue(event.target.value);
	};

	const inputBlurHandler = (event) => {
		setIsTouched(true);
	};

	const reset = () => {
		setEnteredValue("");
		setIsTouched(false);
	};

	return {
		value: enteredValue,
		isValid: valueIsValid,
		hasError,
		valueChangeHandler,
		inputBlurHandler,
		reset,
	};
};
export default useInput;
```

Form component

```js
import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
const {
		value: enteredName,
		isValid: enteredNameIsValid,
		hasError: nameInputHasError,
		valueChangeHandler: nameInputChangeHandler,
		inputBlurHandler: nameBlurHandler,
		reset: resetNameInput,
	} = useInput((value) => value.trim() !== "");

	let formIsValid = false;
	if (enteredNameIsValid) {
		formIsValid = true;
	}
	const formSubmissionHandler = (event) => {
		event.preventDefault();
		resetNameInput();
	};

	const nameInputClasses = nameInputHasError ? "form-control invalid" : "form-control";

	return (
		<form onSubmit={formSubmissionHandler}>
			<div className={nameInputClasses}>
				<label htmlFor="name">Your Name</label>
				<input
					type="text"
					id="name"
					onBlur={nameBlurHandler}
					onChange={nameInputChangeHandler}
					value={enteredName}
				/>
				{nameInputHasError && <p className="error-text">Name must not be empty.</p>}
			</div>
            ...

```

</details>

## 13 - Redux

<details>
<summary>Redux - createStore | useDispatch, useSelector</summary>

```js
import { createStore } from "redux";

const initialCounterState = { value: 0, showCounter: true };
const counterReducer = (state = initialState, action) => {
	if (action.type === "increment")
		return {
			counter: state.counter + 1,
			showCounter: state.showCounter,
		};
	if (action.type === "increase")
		return {
			counter: state.counter + action.amount,
			showCounter: state.showCounter,
		};

	if (action.type === "decrement")
		return {
			counter: state.counter - 1,
			showCounter: state.showCounter,
		};

	if (action.type === "toggle")
		return {
			showCounter: !state.showCounter,
			counter: state.counter,
		};

	return state;
};

const store = createStore(counterReducer);

export default store;
```

index.js

```js
import { Provider } from "react-redux";
import store from "./store/redux-store";

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
```

</details>

<details>
<summary>Redux toolKit : createSlice, configureStore</summary>

Store

```js
import { createSlice, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterReducer";

const store = configureStore({
	reducer: { counter: counterReducer, authentification: authReducer },
});

export default store;
```

Counter reducer

```js
import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = { value: 0, showCounter: true };

const counterSlice = createSlice({
	name: "counter",
	initialState: initialCounterState,
	reducers: {
		increment(state) {
			state.value++;
		},
		decrement(state) {
			state.value--;
		},
		increase(state, action) {
			console.log(action);
			state.value = state.value + action.payload;
		},
		toggleCounter(state) {
			state.value = state.value;
			state.showCounter = !state.showCounter;
		},
	},
});

export default counterSlice.reducer;
export const counterActions = counterSlice.actions;
```

Counter component

```js
import { useDispatch, useSelector } from "react-redux";
import { counterActions } from "../store/redux-store";
import classes from "./Counter.module.css";

const Counter = () => {
	const dispatch = useDispatch();
	const counter = useSelector((state) => state.counter.value);
	const show = useSelector((state) => state.counter.showCounter);

	const incrementHandler = () => {
		dispatch(counterActions.increment());
	};
	const incrementBy5Handler = () => {
		dispatch(counterActions.increase(5));
	};

	const decrementHandler = () => {
		dispatch(counterActions.decrement());
	};

	const toggleCounterHandler = () => {
		dispatch(counterActions.toggleCounter());
	};

	return (
		<main className={classes.counter}>
			<h1>Redux Counter</h1>
			{show && <div className={classes.value}>{counter}</div>}
			<button onClick={incrementHandler}>Increment</button>
			<button onClick={incrementBy5Handler}>Increase by 5</button>
			<button onClick={decrementHandler}>Decrement</button>
			<button onClick={toggleCounterHandler}>Toggle Counter</button>
		</main>
	);
};

export default Counter;
```

</details>

<details>
<summary>Redux Class Component</summary>

```js

import { connect } from "react-redux";
import { Component } from "react;";

import classes from "./Counter.module.css";

class CounterClass extends Component {
    incrementHandler() {
        this.props.increment();
    }

    decrementHandler() {
        this.props.decrement();
    }

    toggleCounterHandler() {

        render() {
            return (
                <main className={classes.counter}>
                    <h1>Redux Counter</h1>
                    <div className={classes.value}>{this.props.counter}</div>
                    <button onClick={this.incrementHandler.bind(this)}>Increment</button>
                    <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
                    <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
                </main>
            );
        }
    }
}

const mapStateToProps = state => {
  return {
    counter:state.counter
  }
}

const mapDispatchToProps = dispatch => {
  return {
      increment: () => dispatch({ type: 'increment' }),
    decrement: () => dispatch ({type: 'decrement'})
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CounterClass);


```

</details>

## 14 - Redux Advanced - Async code

<details>
	<summary>Prefering Reducer</summary>

Component

```js
const addToCartHandler = () => {
	dispatch(
		cartActions.addItemToCart({
			id,
			title,
			price,
		})
	);
};
```

Reducer slice

```js

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		items: [],
		totalQuantity: 0,
		totalAmount: 0,
	},
	reducers: {
		replaceCart(state, action) {
			state.totalQuantity = action.payload.totalQuantity;
			state.items = action.payload.items;
		},

		addItemToCart(state, action) {
			const newItem = action.payload;

			const existingItem = state.items.find((item) => item.id === newItem.id);
			state.totalQuantity++;
			console.log(newItem);

			if (!existingItem) {
				state.items.push({
					id: newItem.id,
					price: newItem.price,
					quantity: 1,
					totalPrice: newItem.price,
					name: newItem.title,
				});
			} else {
				existingItem.quantity++;
				existingItem.totalPrice = existingItem.totalPrice + newItem.price;
			}
		},

```

App / Async Component

```js

let isInitial = true;

function App() {
	const dispatch = useDispatch();
	const showCart = useSelector((state) => state.ui.cartIsVisible);
	const cart = useSelector((state) => state.cart);
	const notification = useSelector((state) => state.ui.notification);

	useEffect(() => {
		const sendCardData = async () => {
			dispatch(
				uiActions.showNotification({
					status: "pending",
					title: "Sending...",
					message: "Sending cart data!",
				})
			);

			const response = await fetch(
				"https://react-app-29bac-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
				{
					method: "PUT",
					body: JSON.stringify(cart),
				}
			);

			if (!response.ok) {
				throw new Error("Sending cart data failed");
			}

			dispatch(
				uiActions.showNotification({
					status: "success",
					title: "Success!",
					message: "Sent cart data successfully!",
				})
			);
		};

		if (isInitial) {
			isInitial = false;
			return;
		}

		sendCardData().catch((error) =>
			dispatch(
				uiActions.showNotification({
					status: "error",
					title: "Error!",
					message: "Sending cart data failed!",
				})
			)
		);
	}, [cart, dispatch]);

```

</details>

<details>
	<summary>Prefering Action & Components</summary>

Component

```js
const ProductItem = (props) => {
	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	const { title, price, description, id } = props;

	const addToCartHandler = () => {

const newTotalQuantity = cart.totalQuantity + 1;

	const updatedItems = cart.items.slice(); // create copy via slice to avoid mutating original state
	const existingItem = updatedItems.find((item) => item.id === id);
	if (existingItem) {
		const updatedItem = { ...existingItem }; // new object + copy existing properties to avoid state mutation
		updatedItem.quantity++;
		updatedItem.totalPrice = updatedItem.totalPrice + price;
		const existingItemIndex = updatedItems.findIndex((item) => item.id === id);
		updatedItems[existingItemIndex] = updatedItem;
	} else {
		updatedItems.push({
			id: id,
			price: price,
			quantity: 1,
			totalPrice: price,
			name: title,
		});
	}

	const newCart = {
		totalQuantity: newTotalQuantity,
		items: updatedItems,
	};
	dispatch(cartActions.replaceCart(newCart));
	};

```

Reducer

```js
const cartSlice = createSlice({
	name: "cart",
	initialState: {
		items: [],
		totalQuantity: 0,
		totalAmount: 0,
	},
	reducers: {
		replaceCart(state, action) {
			state.totalQuantity = action.payload.totalQuantity;
			state.items = action.payload.items;
		},

```

Calling Component

```js
useEffect(() => {
	if (isInitial) {
		isInitial = false;
		return;
	}
	dispatch(sendCardData(cart));
}, [cart, dispatch]);
```

Action Slice Component

```js
export const sendCartData = (cart) => {
	return async (dispatch) => {
		dispatch(
			uiActions.showNotification({
				status: "pending",
				title: "Sending...",
				message: "Sending cart data!",
			})
		);

		const sendRequest = async () => {
			const response = await fetch(
				"https://react-app-29bac-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
				{
					method: "PUT",
					body: JSON.stringify(cart),
				}
			);

			if (!response.ok) {
				throw new Error("Sending cart data failed");
			}
		};

		try {
			await sendRequest();
			dispatch(
				uiActions.showNotification({
					status: "success",
					title: "Success!",
					message: "Sent cart data successfully!",
				})
			);
		} catch (error) {
			dispatch(
				uiActions.showNotification({
					status: "error",
					title: "Error!",
					message: "Sending cart data failed!",
				})
			);
		}
	};
};
```

</details>

<details>
	<summary>Fetching data logic</summary>

Calling Component

```js
useEffect(() => {
	dispatch(fetchCartData());
}, [dispatch]);

useEffect(() => {
	if (isInitial) {
		isInitial = false;
		return;
	}
	if (cart.changed) {
		dispatch(sendCartData(cart));
	}
}, [cart, dispatch]);
```

Action Component / Action Creator

```js
export const fetchCartData = () => {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await fetch(
				"https://react-app-29bac-default-rtdb.europe-west1.firebasedatabase.app/cart.json"
			);

			if (!response.ok) {
				throw new Error("Could not fetch data!");
			}

			const data = await response.json();
			return data;
		};

		try {
			const cartData = await fetchData();
			dispatch(
				cartActions.replaceCart({
					items: cartData.items || [],
					totalQuantity: cartData.totalQuantity,
				})
			);
		} catch (error) {
			dispatch(
				uiActions.showNotification({
					status: "error",
					title: "Error!",
					message: "Fetching  data failed!",
				})
			);
		}
	};
};
```

Redux DevTools

</details>

## 15 - React Router

<details>

<summary>Route, NavLink, useParams, Nested Route</summary>

npm i react-router-dom

Index - BrowserRouter

```js
ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById("root")
);
```

App - Redirect , Switch, exact

```js
<Switch>
	<Route path="/" exact>
		<Redirect to="/welcome" />
	</Route>
	<Route path="/welcome">
		<Welcome />
	</Route>
	<Route path="/products" exact>
		<Products />
	</Route>
	<Route path="/products/:productId">
		<ProductDetail />
	</Route>
</Switch>
```

NavLink & activeClassName

```js
<li>
						<NavLink activeClassName={classes.active} to="/welcome">
							Welcome
						</NavLink>
					</li>
					<li>
						<NavLink activeClassName={classes.active} to="/products">
							Products
						</NavLink>
					</li>
					<li>
						<NavLink activeClassName={classes.active} to="/product-detail/:productId">
							Detail
						</NavLink>
					</li>

// Link

<ul>
	<li>
		<Link to="/products/p1">A book</Link>
	</li>
	<li>
		<Link to="/products/p2">A carpet</Link>
	</li>
	<li>
		<Link to="/products/p3">A online course</Link>
	</li>
</ul>
```

useParams()

```js
const params = useParams();
<p>params.productId</p>

//
<Route path="/products/:productId">

```

Nested Route

```js
const Welcome = () => {
	return (
		<section>
			<h1>The Welcome Page</h1>
			<Route path="/welcome/new-user">
				<p>Welcome, new user!</p>
			</Route>
		</section>
	);
};
```

</details>

<details>  
<summary>History, location, new URLSearchParam, Prompt</summary>

history.push/replace, location, new URLSearchParams

```js
const history = useHistory();
const location = useLocation();

const queryParams = new URLSearchParams(location.search);
const isSortingAscending = queryParams.get("sort") === "asc";

const sortedQuotes = sortQuotes(props.quotes, isSortingAscending);

const changeSortingHandler = () => {
	history.push({
		pathname: location.pathname,
		search: `sort=${isSortingAscending ? "desc" : "asc"}`,
	});
};

// 	history.push(`${location.pathname}?sort=${isSortingAscending ? "desc" : "asc"}`);
// };
```

prompt

```js
<Fragment>
			<Prompt when={isEntering} message={(location) => "Are you sure you want to leave?"} />
			<Card>
```



</details>


## 16 - Deploy React App

<details>  
<summary>Deployment steps</summary>

```
-Test code

-Optimize
>( react.memo)

>Lazy loading
React.lazy(() => import('./path/'));
<Suspense fallback={<div><LoadingSpinnger /></div>}>
<Route...
</Suspense>

-Build app
package.json
npm run build

-Upload

-Configure server

```

</details>
	
## 17 - Authentication

<details>
<summary>Managing Authentication with context & firebase</summary>

-auth-context
 - Create context
 - Set Token + localStorage
 - Auto logout & expiration Time

```js

import React, { useState, useEffect, useCallback } from "react";

let logoutTimer;

const AuthContext = React.createContext({
	token: "",
	isLoggedIn: false,
	login: (token) => {},
	logout: () => {},
});

const calculateRemainingTime = (expirationTIme) => {
	const currentTime = new Date().getTime();
	const adjExpirationTime = new Date(expirationTIme).getTime();

	const remainingDuration = adjExpirationTime - currentTime;
	return remainingDuration;
};

const retrieveStoredToken = () => {
	const storedToken = localStorage.getItem("token");
	const storedExpirationDate = localStorage.getItem("expirationTime");

	const remainingTime = calculateRemainingTime(storedExpirationDate);

	if (remainingTime <= 60000) {
		return null;
	}

	return {
		token: storedToken,
		duration: remainingTime,
	};
};

export const AuthContextProvider = (props) => {
	const tokenData = retrieveStoredToken();
	let initialToken;

	if (tokenData) {
		initialToken = tokenData.token;
	}

	const [token, setToken] = useState(initialToken);
	const userIsLoggedIn = !!token;

	const logoutHandler = useCallback(() => {
		setToken(null);
		localStorage.removeItem("token");

		if (logoutTimer) {
			clearTimeout(logoutTimer);
		}
	}, []);

	const loginHandler = (token, expirationTime) => {
		const remainingTime = calculateRemainingTime(expirationTime);
		localStorage.setItem("token", token);
		localStorage.setItem("expirationTime", expirationTime);
		setToken(token);
		logoutTimer = setTimeout(logoutHandler, remainingTime);
	};

	useEffect(() => {
		if (tokenData) {
			logoutTimer = setTimeout(logoutHandler, tokenData.duration);
		}
	}, [tokenData, logoutHandler]);

	const contextValue = {
		token: token,
		isLoggedIn: userIsLoggedIn,
		login: loginHandler,
		logout: logoutHandler,
	};

	return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};


```

</details>

<details>
<summary>Fetching to firebase</summary>

Auth component
 - SignUp and Login Fetch
 - Set expiration time
```js

	const authCtx = useContext(AuthContext);

	const switchAuthModeHandler = () => {
		setIsLogin((prevState) => !prevState);
	};

	const submitHandler = (event) => {
		event.preventDefault();

		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;

		setIsLoading(true);
		let url;
		if (isLogin) {
			url =
				"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDxuLREeVmsg7E72bmFzXmaLn5Zqgf6PyA";
		} else {
			url =
				"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDxuLREeVmsg7E72bmFzXmaLn5Zqgf6PyA";
		}
		fetch(url, {
			method: "POST",
			body: JSON.stringify({
				email: enteredEmail,
				password: enteredPassword,
				returnSecureToken: true,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				setIsLoading(false);
				if (res.ok) {
					return res.json();
				} else {
					return res.json().then((data) => {
						let errorMessage = " Authentication failed";
						if (data && data.error && data.error.message) {
							errorMessage = data.error.message;
						}
						throw new Error(errorMessage);
					});
				}
			})
			.then((data) => {
				const expirationTIme = new Date(new Date().getTime() + +data.expiresIn * 1000);
				authCtx.login(data.idToken, expirationTIme.toISOString());
			})
			.catch((err) => {
				alert(err.message);
			});
	};

```
</details>


<details>
<summary>Protecting Front-End Pages with Router</summary>

App
 - Get Login data and apply Route accordingly
```js

function App() {
	const { isLoggedIn } = useContext(AuthContext);

	return (
		<Layout>
			<Switch>
				<Route path="/" exact>
					<HomePage />
				</Route>
				{!isLoggedIn && (
					<Route path="/auth">
						<AuthPage />
					</Route>
				)}

				{isLoggedIn && (
					<Route path="/profile">
						<UserProfile />
					</Route>
				)}

				<Route path="*">
					<Redirect to="/" />
				</Route>
			</Switch>

```

</details>


## 18 - State Management with React Hooks, No Redux

<details>
<summary>Managing State with React Hooks</summary>

store
 - Create store
 - Custom hook store
 - Configure wide state in index.js
 - Load/Set state using useStore hook
 - Optimize with React.memo & "shouldListen"
```js
import { useState, useEffect } from "react";

let globalState = {};
let listeners = [];
let actions = {};

export const useStore = (shouldListen = true) => {
	const setState = useState(globalState)[1];

	const dispatch = (actionIdentifier, payload) => {
		const newState = actions[actionIdentifier](globalState, payload);
		globalState = { ...globalState, ...newState };

		for (const listener of listeners) {
			listener(globalState);
		}
	};

	useEffect(() => {
		if (shouldListen) {
			listeners.push(setState);
		}
		return () => {
			if (shouldListen) {
				listeners = listeners.filter((li) => li !== setState);
			}
		};
	}, [setState]);

	return [globalState, dispatch];
};

export const initStore = (userActions, initialState) => {
	if (initialState) {
		globalState = { ...globalState, ...initialState };
	}
	actions = { ...actions, ...userActions };
};

```
products-store
```js

import { initStore } from "./store";

const configureStore = () => {
	const actions = {
		TOGGLE_FAV: (curState, productId) => {
			const prodIndex = curState.products.findIndex((p) => p.id === productId);
			const newFavStatus = !curState.products[prodIndex].isFavorite;
			const updatedProducts = [...curState.products];
			updatedProducts[prodIndex] = {
				...curState.products[prodIndex],
				isFavorite: newFavStatus,
			};
			return { products: updatedProducts };
		},
	};
	initStore(actions, {
		products: [
			{
				id: "p1",
				title: "Red Scarf",
				description: "A pretty red scarf.",
				isFavorite: false,
            },
            // data etc
		],
	});
};

export default configureStore;


```

index.js
```js

import configureProductStore from "./components/hooks-store/products-store";

configureProductStore();
// configureCounterStore(); ex

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById("root")
```

products component
```js
import { useStore } from "../components/hooks-store/store";
const Products = (props) => {
	const state = useStore()[0];

	return (
		<ul className="products-list">
			{state.products.map((prod) => (
				<ProductItem
					key={prod.id}
					id={prod.id}
                    // ... etc

```

productsItem component
```js
const ProductItem = React.memo((props) => {
	const dispatch = useStore(false)[1];

	const toggleFavHandler = () => {
		// toggleFav(props.id);
		dispatch("TOGGLE_FAV", props.id);
	};


```

</details>

</details>
	
## 19 - Testing React Apps

<details>
<summary>I - Intro
</summary>

```
Manual testing
-Write Code <> Preview & Test in Browser
-See what user will see

Automated Testing
-Code that tests your code
-You test individual building blocks of your app
-Technical but test ALL building blocks


Unit Tests
-Test individual building blocks => Project contains +dozens/hundreds 

Integration Tests
-Test combination of multiple blocks => Project contains a few

End to End
-Test complete scenarios of UX => Project contains a few
-Can be done manually

---

Tool for test and => Jest
Tool for simulating => React Testing Library

```
</details>


<details>
<summary>II - Arrange, Act, Assert
</summary>

Greeting.test.js
```js

import Greeting from './Greeting'
import {render, screen} from '@testing-library/react'

test('renders Hello World as a text', () => {

// Arrange
    render(<Greeting />);

    // Act
    // ... 

    // Assert
    const helloWorldElement = screen.getByText('Hello World', {exact: false});
    // const helloWorldElement = screen.getByText('Hello World');
    expect(helloWorldElement).toBeInTheDocument();
});

```


</details>		
			

## Others

<details>  
	<summary>Plus</summary>



##### Lifting State Up

##### Outputting Dynamic List of Content

##### Rendering Content Under Certain Conditions

</details>
