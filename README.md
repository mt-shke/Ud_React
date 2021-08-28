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
  
static contextType = UsersContext;

error boundaries

<details>

<summary> static contextType </summary>

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
<summary> Error Boundaries </summary>

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


	
  
## Others  	

<details>  
	<summary> Things I've learned </summary>
	

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

  
</details>	
