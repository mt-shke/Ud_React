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

const Button = styled.button`
  font: inherit;
  padding: 0.5rem 1.5rem;
  border: 1px solid #8b005d;
  color: white;
  background: #8b005d;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.26);
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:hover,
  &:active {
    background: #ac0e77;
    border-color: #ac0e77;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.26);
  }
`;
	
```  
</details>  

<details>
	<summary>CSS Modules </summary>  
  
```js	
import styles from './CourseInput.module.css';
	
  <div className={`${styles['form-control']} ${!isValid && styles.invalid}`}>
	
```  
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

```  
</details>  


<details>
	<summary>Refs </summary>  
  
```js	

	const inputNameRef= useRef(); ref={inputNameRef}  
	const enteredName = inputNameRef.current.value;  
	<input ref={inputNameRef} />
	
	// useRef -> uncontrolledComponent(using DOM by Ref) | useState -> controlledComponent(use props and callbackFunc like onChange)
	
```  
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
```  
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
```  
	
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



<details>  

<summary> ### Things I've learned </summary>  
		
#### props.items

    		<Expense items={expenses} />

#### Component function Card() {

- const classes = "card " + props.className;
- return <div className={classes}>{props.children}</div>;
  }
  }

##### DOM Element onClick

##### const [titleToChange, setNewTitleFunction] = useState('');

setNewTitleFunction('New Title');

##### onAddExpenseData={addExpenseDataHandler}

##### Lifting State Up

##### Outputting Dynamic List of Content

##### Rendering Content Under Certain Conditions
		
### Complex Reducer & Context Provider	
	
```js
	import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCarState = {
	items: [],
	totalAmount: 0,
};

const cartReducer = (state, action) => {
	if (action.type === "ADD") {
		const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

		const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);
		const existingCartItem = state.items[existingCartItemIndex];
		let updatedItems;

		if (existingCartItem) {
			const updatedItem = { ...existingCartItem, amount: existingCartItem.amount + action.item.amount };
			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updatedItem;
		} else {
			const updatedItem = { ...action.item };
			updatedItems = state.items.concat(action.item);
		}
		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}
	if (action.type === "REMOVE") {
	}
	return defaultCarState;
};

const CartProvider = (props) => {
	const [cartSate, dispatchCartAction] = useReducer(cartReducer, defaultCarState);

	const addItemToCartHandler = (item) => {
		dispatchCartAction({ type: "ADD", item: item });
	};

	const removeItemToCartHander = (id) => {
		dispatchCartAction({ type: "REMOVE", id: id });
	};

	const cartContext = {
		items: cartSate.items,
		totalAmount: 0,
		addItem: addItemToCartHandler,
		removeItem: removeItemToCartHander,
	};

	return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
};

export default CartProvider;

	```js
	
	#### useEffect & timer
	
	```js 
	const HeaderCartButton = (props) => {
	const [btnIsHighLighted, setBtnIsHighLighted] = useState(false);
	const cartCtx = useContext(CartContext);
	const { items } = cartCtx;

	const numberOfCartItems = items.reduce((curNumber, item) => {
		return curNumber + item.amount;
	}, 0);

	const btnClasses = `${classes.button} ${btnIsHighLighted ? classes.bump : ""} `;

	useEffect(() => {
		if (cartCtx.items.length === 0) {
			return;
		}
		setBtnIsHighLighted(true);
		const timer = setTimeout(() => {
			setBtnIsHighLighted(false);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [items]);
	
	```js
	
	
	</details>




